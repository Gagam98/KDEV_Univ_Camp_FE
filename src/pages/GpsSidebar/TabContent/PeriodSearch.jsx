import React from "react";
import "@@@/TabContent/PeriodSearch.css";

const PeriodSearch = () => {
  return (
    <div className="date-search common-width">
      <h3>기간 검색</h3>
      <div className="date-picker">
        <input type="date" />
        <span>부터</span>
        <input type="date" />
        <span>까지</span>
      </div>
    </div>
  );
};

export default PeriodSearch; // export default 추가
