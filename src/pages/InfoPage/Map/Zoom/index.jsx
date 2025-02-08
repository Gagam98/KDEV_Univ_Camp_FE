import React, { useEffect } from "react";
import "@@/InfoPage/Map/Zoom/Zoom.css";

const Zoom = ({ mapInstance }) => {
  useEffect(() => {
    if (mapInstance) {
      const zoomControl = new window.kakao.maps.ZoomControl();
      mapInstance.addControl(
        zoomControl,
        window.kakao.maps.ControlPosition.RIGHT
      );
    }
  }, [mapInstance]);

  return <div className="zoom-overlay"></div>;
};

export default Zoom;
