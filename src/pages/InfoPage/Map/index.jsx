import React, { useState } from "react";
import { useKakaoMapLoader } from "@/hooks/useKakaoMapLoader";
import DateSelector from "@@/InfoPage/Map/DateSelector";
import LocationDisplay from "@@/InfoPage/Map/LocationDisplay";
import "@@/InfoPage/Map/Map.css";
import carIcon from "@/assets/carMarker.png";
import { useCallback } from "react";

const Map = () => {
  const [positions, setPositions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  let map = null;
  let polyline = null;

  const initMap = useCallback(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 7,
    };

    map = new window.kakao.maps.Map(container, options);
    map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TERRAIN);

    trackLocation();

    window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      console.log("클릭한 위치의 좌표:", latlng.getLat(), latlng.getLng());
    });
  }, []);

  useKakaoMapLoader(initMap);

  const trackLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const newPosition = new window.kakao.maps.LatLng(lat, lon);
        setPositions([newPosition]);

        displayMarker(newPosition, true);
        drawPolyline();
      });
    } else {
      console.error("Geolocation을 지원하지 않습니다.");
    }
  };

  const displayMarker = (position, useCustomIcon) => {
    const markerOptions = {
      map: map,
      position: position,
    };

    if (useCustomIcon) {
      const imageSize = new window.kakao.maps.Size(50, 75);
      const imageOption = { offset: new window.kakao.maps.Point(25, 75) };
      const markerImage = new window.kakao.maps.MarkerImage(
        carIcon,
        imageSize,
        imageOption
      );
      markerOptions.image = markerImage;
    }

    const marker = new window.kakao.maps.Marker(markerOptions);
    map.setCenter(position);
  };

  const drawPolyline = () => {
    if (positions.length > 1) {
      if (polyline) polyline.setMap(null);

      polyline = new window.kakao.maps.Polyline({
        path: positions,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeStyle: "solid",
      });

      polyline.setMap(map);
    }
  };

  return (
    <div className="map-page">
      <LocationDisplay />
      <div className="date-container">
        <DateSelector onDateChange={setSelectedDate} />
      </div>
      <div id="map" className="map-container"></div>
    </div>
  );
};

export default Map;
