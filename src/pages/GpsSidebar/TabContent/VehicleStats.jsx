import React from "react";
import "@@@/TabContent/VehicleStats.css";

const VehicleStats = () => {
  return (
    <div className="stats-container common-width">
      {/* 전체 차량 */}
      <div className="stat-card" style={{ backgroundColor: "#d5e8ff" }}>
        <h3>70</h3>
        <p>전체 차량</p>
      </div>
      {/* 운행 차량 */}
      <div className="stat-card" style={{ backgroundColor: "#d4f7e2" }}>
        <h3>45</h3>
        <p>운행 차량</p>
      </div>
      {/* 미운행 차량 */}
      <div className="stat-card" style={{ backgroundColor: "#ffe4cc" }}>
        <h3>20</h3>
        <p>미운행 차량</p>
      </div>
      {/* 미결제 차량 */}
      <div className="stat-card" style={{ backgroundColor: "#e4e4e4" }}>
        <h3>5</h3>
        <p>미결제 차량</p>
      </div>
    </div>
  );
};

// 컴포넌트를 기본 내보내기로 설정
export default VehicleStats;
