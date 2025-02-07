import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@@/InfoPage/Map/Battery/Battery.css";

const Battery = ({ level, isCharging }) => {
  return (
    <div className="battery-overlay">
      <div className="battery-box">
        <div className="battery-progress" style={{ width: `${level}%` }}></div>
        <div className="battery-cap"></div>
        {isCharging && (
          <div className="charging-icon">
            <i className="fas fa-bolt charging-icon-symbol"></i>
          </div>
        )}
        <span className="battery-text">{level}%</span>
      </div>
    </div>
  );
};

export default Battery;
