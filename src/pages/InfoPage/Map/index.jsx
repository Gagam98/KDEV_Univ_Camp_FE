import React, { useEffect, useState } from "react";
import "@@/InfoPage/Map/Map.css";
import carIcon from "@/assets/carMarker.png";

const Map = () => {
  const [positions, setPositions] = useState([]);
  let map = null;
  let polyline = null;

  useEffect(() => {
    const initMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 7,
        };
        map = new window.kakao.maps.Map(container, options);

        map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TERRAIN);

        trackLocation();

        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            console.log(
              "클릭한 위치의 좌표:",
              latlng.getLat(),
              latlng.getLng()
            );
          }
        );
      } else {
        console.error("Kakao maps API가 로드되지 않았습니다.");
      }
    };

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=273162e89b73e08bbf2a0524708342e1&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(initMap);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  return <div id="map" className="map-container"></div>;
};

export default Map;
