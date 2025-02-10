import React from "react";
import DateSelector from "@@/InfoPage/Map/DateSelector";
import LocationDisplay from "@@/InfoPage/Map/LocationDisplay";
import DrivingStatus from "@@/InfoPage/Map/DrivingStatus";
import Battery from "@@/InfoPage/Map/Battery";
import Zoom from "@@/InfoPage/Map/Zoom";
import { MapProvider } from "@@/InfoPage/Map/MapProvider";
import "@@/InfoPage/Map/Map.css";

const Map = () => {
  const { map, setSelectedDate } = MapProvider();

  return (
    <>
      <div id="map"></div>
      <div className="map-page">
        <LocationDisplay />
        <div className="date-container">
          <DateSelector onDateChange={setSelectedDate} />
        </div>

        <div className="map-wrapper">
          <div id="map" className="map-container"></div>
          <div className="status-left-bottom">
            <DrivingStatus status="운행중" />
            <Battery level={50} isCharging={true} />
          </div>

          <Zoom mapInstance={map} />
        </div>
      </div>
    </>
  );
};

export default Map;
