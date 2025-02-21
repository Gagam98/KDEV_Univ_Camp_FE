import React, { useEffect, useState, useCallback } from "react";
import { useKakaoMapLoader } from "@/hooks/useKakaoMapLoader";
import { searchTripData } from "@/api/tripApi";
import DateSelector from "@@/InfoPage/Map/DateSelector";
import DrivingStatus from "@@/InfoPage/Map/DrivingStatus";
import Battery from "@@/InfoPage/Map/Battery";
import Zoom from "@@/InfoPage/Map/Zoom";
import styles from "@@/InfoPage/Map/Map.module.css";

const Map = ({ carInfo }) => {
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(["All time"]);
  const [selectedInterval, setSelectedInterval] = useState(60);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDate[0] || !selectedDate[1]) {
        console.error("🚨 startDate 또는 endDate가 정의되지 않았습니다.");
        return;
      }
      try {
        const tripData = await searchTripData(
          selectedDate[0],
          selectedDate[1],
          selectedInterval
        );
        setApiData(tripData.tripData);
      } catch (error) {
        console.error("🚨 데이터 불러오기 실패:", error);
      }
    };
    fetchData();
  }, [selectedDate, selectedInterval]);

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

  return (
    <>
      <div id="map" className={styles.mapContainer}></div>
      <div className={styles.mapPage}>
        <div className={styles.dateContainer}>
          <DateSelector
            onDateRangeChange={setSelectedDate}
            onIntervalChange={setSelectedInterval}
          />
        </div>
        <div className={styles.statusLeftBottom}>
          <DrivingStatus status={carInfo.status} />
          <Battery level={80} isCharging={false} remainingTime={160} />
        </div>
        <Zoom mapInstance={map} />
      </div>
    </>
  );
};

export default Map;
