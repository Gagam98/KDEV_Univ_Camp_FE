import React from "react";
import DateSelector from "@@/InfoPage/Map/DateSelector";
import LocationDisplay from "@@/InfoPage/Map/LocationDisplay";
import DrivingStatus from "@@/InfoPage/Map/DrivingStatus";
import Battery from "@@/InfoPage/Map/Battery";
import Zoom from "@@/InfoPage/Map/Zoom";
import { useMapDetails } from "@@/InfoPage/Map/MapProvider";
import styles from "@@/InfoPage/Map/Map.module.css";

const Map = () => {
  const { map, setSelectedDate } = useMapDetails();

  return (
    <>
      <div id="map" className={styles.mapContainer}></div>
      <div className={styles.mapPage}>
        <LocationDisplay />
        <div className={styles.dateContainer}>
          <DateSelector onDateChange={setSelectedDate} />
        </div>

        <div className={styles.mapWrapper}>
          <div className={styles.statusLeftBottom}>
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
