import React from "react";
import koreaMap from "@/assets/koreaMap.webp";
import styles from "./AllVehicles.module.css";

const AllVehicles = () => {
  return (
    <div className={styles.container}>
      <img src={koreaMap} alt="Korea Map" className={styles.mapImage} />
    </div>
  );
};

export default AllVehicles;
