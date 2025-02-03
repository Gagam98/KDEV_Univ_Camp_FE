import React from "react";
import periodIcon from "@/assets/calendar.png";
import searchIcon from "@/assets/car.png";
import statsIcon from "@/assets/map.png";
import listIcon from "@/assets/list.png";

const IconMenu = ({ setActiveTab }) => {
  return (
    <div className="icon-menu">
      {/* 최상단에 list.png 추가 */}
      <div className="icon list-icon">
        <img src={listIcon} alt="메뉴 목록" />
      </div>

      {/* 기존 아이콘들 */}
      <div className="icon" onClick={() => setActiveTab("기간검색")}>
        <img src={periodIcon} alt="기간검색" />
      </div>
      <div className="icon" onClick={() => setActiveTab("차량검색")}>
        <img src={searchIcon} alt="차량검색" />
      </div>
      <div className="icon" onClick={() => setActiveTab("차량정보")}>
        <img src={statsIcon} alt="차량정보" />
      </div>
    </div>
  );
};

export default IconMenu;
