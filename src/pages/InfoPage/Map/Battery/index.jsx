import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@@/InfoPage/Map/Battery/Battery.css";

const Battery = () => {
  return (
    <div className="battery-overlay">
      <div className="fa-stack fa-4x battery battery-drain">
        <i className="fas fa-stack-1x fa-battery-empty"></i>
        <i className="fas fa-stack-1x fa-battery-quarter"></i>
        <i className="fas fa-stack-1x fa-battery-half"></i>
        <i className="fas fa-stack-1x fa-battery-three-quarters"></i>
        <i className="fas fa-stack-1x fa-battery-full"></i>
      </div>
    </div>
  );
};

export default Battery;
