import React from "react";
import DateSelector from "@@/InfoPage/Map/DateSelector";
import LocationDisplay from "@@/InfoPage/Map/LocationDisplay";
import DrivingStatus from "@@/InfoPage/Map/DrivingStatus";
import Battery from "@@/InfoPage/Map/Battery";
import Zoom from "@@/InfoPage/Map/Zoom";
import { MapProvider } from "@@/InfoPage/Map/MapProvider";
import styles from "@@/InfoPage/Map/Map.module.css";

const Map = ({ carInfo }) => {
  const { map, setSelectedDate } = MapProvider();

  return (
    <>
      <div id="map" className={styles.mapContainer}></div>
      <div className={styles.mapPage}>
        <LocationDisplay />
        <div className={styles.dateContainer}>
          <DateSelector onDateChange={setSelectedDate} />
        </div>

        <div className={styles.statusLeftBottom}>
          <DrivingStatus status={carInfo.status} />
          <Battery level={80} isCharging={false} remainingTime={160} />
        </div>
        <Zoom mapInstance={map} />
      </div>
    </>
  );
};

export default Map;
