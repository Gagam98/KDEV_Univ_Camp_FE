import React from "react";

const NoVehicleInfoPage = () => {
  return (
    <div className="no-vehicle-info-page">
      <div className="message-container">
        <h1 className="error-title">차량정보가 없습니다.</h1>
        <p className="error-description">입력하신 정보를 다시 확인해 주세요.</p>
      </div>
    </div>
  );
};

export default NoVehicleInfoPage;
