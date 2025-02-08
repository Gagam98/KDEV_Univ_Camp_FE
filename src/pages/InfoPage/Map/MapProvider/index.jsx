import { useState, useEffect, useCallback } from "react";
import { useKakaoMapLoader } from "@/hooks/useKakaoMapLoader";
import carIcon from "@/assets/carMarker.png";

const useMapDetails = () => {
  const [positions, setPositions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);

  const initMap = useCallback(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 7,
    };

    const newMap = new window.kakao.maps.Map(container, options);
    newMap.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TERRAIN);
    newMap.setZoomable(false);
    setMap(newMap);

    trackLocation(newMap);

    window.kakao.maps.event.addListener(newMap, "click", (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      console.log("클릭한 위치의 좌표:", latlng.getLat(), latlng.getLng());
    });
  }, []);

  useKakaoMapLoader(initMap);

  const trackLocation = (mapInstance) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const newPosition = new window.kakao.maps.LatLng(lat, lon);
        setPositions([newPosition]);

        displayMarker(newPosition, true, mapInstance);
        drawPolyline(mapInstance);
      });
    } else {
      console.error("Geolocation을 지원하지 않습니다.");
    }
  };

  const displayMarker = (position, useCustomIcon, mapInstance) => {
    const markerOptions = {
      map: mapInstance,
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
    mapInstance.setCenter(position);
  };

  const drawPolyline = (mapInstance) => {
    if (positions.length > 1) {
      if (polyline) polyline.setMap(null);

      const newPolyline = new window.kakao.maps.Polyline({
        path: positions,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeStyle: "solid",
      });

      newPolyline.setMap(mapInstance);
      setPolyline(newPolyline);
    }
  };

  return { map, setSelectedDate };
};

export default useMapDetails;
