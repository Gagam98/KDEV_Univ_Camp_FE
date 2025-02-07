import React from "react";
import "@@/InfoPage/Map/DrivingStatus/DrivingStatus.css";

const DrivingStatus = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case "운행중":
        return "status-running";
      case "미운행":
        return "status-stopped";
      case "미관제":
        return "status-unmonitored";
      default:
        return "";
    }
  };

  return (
    <div className={`status-container ${getStatusClass()}`}>
      <span className="status-circle"></span>
      <span className="status-text">{status}</span>
    </div>
  );
};

export default DrivingStatus;
