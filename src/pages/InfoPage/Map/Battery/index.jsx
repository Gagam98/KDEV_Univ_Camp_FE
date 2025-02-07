import React from "react";
import "@@/InfoPage/Map/Battery/Battery.css";

const Battery = () => {
  return (
    <div className="battery-overlay">
      <div className="fa-stack fa-4x battery battery-drain">
        <i className="fa fa-stack-1x fa-battery-0"></i>
        <i className="fa fa-stack-1x fa-battery-1"></i>
        <i className="fa fa-stack-1x fa-battery-2"></i>
        <i className="fa fa-stack-1x fa-battery-3"></i>
        <i className="fa fa-stack-1x fa-battery-4"></i>
      </div>
    </div>
  );
};

export default Battery;
