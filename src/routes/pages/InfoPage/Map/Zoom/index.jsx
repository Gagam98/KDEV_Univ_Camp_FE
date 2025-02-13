import React, { useEffect } from "react";
import "./Zoom.module.css";

const Zoom = ({ mapInstance }) => {
  useEffect(() => {
    if (mapInstance) {
      const zoomControl = new window.kakao.maps.ZoomControl();
      mapInstance.addControl(
        zoomControl,
        window.kakao.maps.ControlPosition.BOTTOMRIGHT
      );
    }
  }, [mapInstance]);

  return null;
};

export default Zoom;
