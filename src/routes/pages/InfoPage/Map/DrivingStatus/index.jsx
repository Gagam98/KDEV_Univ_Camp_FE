import React from "react";
import styles from "./DrivingStatus.module.css";

const DrivingStatus = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case "운행 중":
        return styles.statusRunning;
      case "미운행":
        return styles.statusStopped;
      case "미관제":
        return styles.statusUnmonitored;
      default:
        return "";
    }
  };

  return (
    <div className={`${styles.statusContainer} ${getStatusClass()}`}>
      <span className={styles.statusIcon}>⏻</span>
      <span className={styles.statusText}>{status}</span>
    </div>
  );
};

export default DrivingStatus;
