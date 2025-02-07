import React, { useEffect } from "react";
import "@@/InfoPage/Map/Zoom/Zoom.css";

const Zoom = () => {
  useEffect(() => {
    const zoomControl = new window.kakao.maps.ZoomControl();
    window.map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  }, []);

  return <div className="zoom-control-overlay"></div>;
};

export default Zoom;
