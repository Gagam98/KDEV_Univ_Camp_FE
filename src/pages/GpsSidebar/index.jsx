{
  /* 
import React from "react";
import UserInfo from "@@@/UserInfo/UserInfo";
import PeriodSearch from "@@@/TabContent/PeriodSearch";
import VehicleSearch from "@@@/TabContent/VehicleSearch";
import VehicleStats from "@@@/TabContent/VehicleStats";
*/
}
import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import PeriodSearch from "./TabContent/PeriodSearch";
import VehicleSearch from "./TabContent/VehicleSearch";
import VehicleStats from "./TabContent/VehicleStats";

const Sidebar = ({ activeTab, setActiveTab, navigate }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "기간검색":
        return <PeriodSearch />;
      case "차량검색":
        return <VehicleSearch />;
      case "차량정보":
        return <VehicleStats />;
      default:
        return null;
    }
  };

  return (
    <div className="sidebar-container">
      <div className="content-area">
        <UserInfo navigate={navigate} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;
