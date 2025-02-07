import React from "react";
import "@@/InfoPage/Distance/Distance.css";

const Distance = () => {
  return (
    <div className="distance-ticket">
      <div className="distance-section">
        <span className="location start">서울</span>
        <div className="train-path">
          <span className="train-icon">🚂</span>
          <span className="date">2025-02-01</span>
        </div>
        <span className="location end">부산</span>
      </div>
      <div className="distance-info">
        <span className="time start-time">9:00 AM</span>
        <span className="date-label">2025-02-01</span>
        <span className="time end-time">10:00 PM</span>
        <span className="date-label">2025-03-01</span>
      </div>
    </div>
  );
};

export default Distance;
