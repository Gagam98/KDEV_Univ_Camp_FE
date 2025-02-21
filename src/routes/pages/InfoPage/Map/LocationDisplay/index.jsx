import React, { useEffect, useState, useCallback } from "react";
import { useKakaoMapLoader } from "@/hooks/useKakaoMapLoader";
import { searchTripData } from "@/api/tripApi";

const LocationDisplay = ({ carNumber, startDate, endDate, interval }) => {
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!carNumber) {
        console.error("🚨 차량 번호 없음!");
        return;
      }

      try {
        console.log(
          `🔍 API 요청: carNumber=${carNumber}, startDate=${startDate}, endDate=${endDate}, interval=${interval}`
        );
        const tripData = await searchTripData(
          carNumber,
          startDate,
          endDate,
          interval
        );
        console.log("📌 응답 데이터:", tripData);
        setApiData(tripData.tripData);
      } catch (error) {
        console.error("🚨 데이터 불러오기 실패:", error);
      }
    };
    fetchData();
  }, [carNumber, startDate, endDate, interval]);

  const initMap = useCallback(() => {
    if (apiData.length === 0) {
      console.warn("⚠️ 데이터가 없습니다. 지도 초기화 중지.");
      return;
    }

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
    if (!map || apiData.length === 0) return;

    if (polyline) {
      polyline.setMap(null);
    }
    markers.forEach((marker) => marker.setMap(null));

    const linePath = apiData.map(
      (row) => new kakao.maps.LatLng(row.latitude, row.longitude)
    );

    console.log("📍 지도에 표시될 좌표:", linePath);

    const newMarkers = apiData.map((row) => {
      return new kakao.maps.Marker({
        position: new kakao.maps.LatLng(row.latitude, row.longitude),
        map: map,
      });
    });

    setMarkers(newMarkers);

    const newPolyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#FFAE00",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });

    newPolyline.setMap(map);
    setPolyline(newPolyline);
  }, [map, apiData]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default LocationDisplay;
