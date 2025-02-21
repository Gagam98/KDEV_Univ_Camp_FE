import React, { useEffect, useState, useCallback } from "react";
import { useKakaoMapLoader } from "@/hooks/useKakaoMapLoader";
import { searchTripData } from "@/api/tripApi";

const LocationDisplay = ({ startDate, endDate, interval }) => {
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await searchTripData(startDate, endDate, interval);
        setApiData(tripData);
      } catch (error) {
        console.error("🚨 데이터 불러오기 실패:", error);
      }
    };
    fetchData();
  }, [startDate, endDate, interval]);

  const initMap = useCallback(() => {
    if (apiData.length === 0) return;
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(apiData[0].latitude, apiData[0].longitude),
      level: 5,
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOption);
    kakaoMap.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
    kakaoMap.setZoomable(false);
    setMap(kakaoMap);
  }, [apiData]);

  useKakaoMapLoader(initMap);

  useEffect(() => {
    if (map && apiData.length > 0) {
      const linePath = apiData.map(
        (row) => new kakao.maps.LatLng(row.latitude, row.longitude)
      );

      if (polyline) {
        polyline.setMap(null);
      }

      const newPolyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeStyle: "solid",
      });

      newPolyline.setMap(map);
      setPolyline(newPolyline);
    }
  }, [map, apiData]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default LocationDisplay;
