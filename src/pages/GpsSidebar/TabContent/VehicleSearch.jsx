import React from "react";
import "@@@/TabContent/VehicleSearch.css";

const VehicleSearch = () => {
  return (
    <div className="search-section">
      <h3>차량 검색</h3>
      <div className="vehicle-search">
        <select>
          <option>차량 번호</option>
          <option>차량 이름</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요" />
        <button>검색</button>
      </div>
    </div>
  );
};

export default VehicleSearch;
