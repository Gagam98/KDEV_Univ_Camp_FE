import React, { useEffect } from "react";
import "@@/InfoPage/Map/Zoom/Zoom.css";

const Zoom = ({ mapInstance }) => {
  useEffect(() => {
    if (mapInstance) {
      const existingControls = document.querySelectorAll(
        ".kakao-map-zoom-control"
      );
      existingControls.forEach((control) => control.remove());

      const zoomControl = new window.kakao.maps.ZoomControl();
      mapInstance.addControl(
        zoomControl,
        window.kakao.maps.ControlPosition.RIGHT
      );
    }
  }, [mapInstance]);

  return null;
};

export default Zoom;
