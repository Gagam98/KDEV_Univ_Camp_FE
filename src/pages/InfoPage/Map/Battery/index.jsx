import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./Battery.module.css";

const Battery = ({ level, isCharging }) => {
  return (
    <div className={styles.batteryOverlay}>
      <div className={styles.batteryBox}>
        <div
          className={styles.batteryProgress}
          style={{ width: `${level}%` }}
        ></div>
        <div className={styles.batteryCap}></div>
        {isCharging && (
          <div className={styles.chargingIcon}>
            <i className={`fas fa-bolt ${styles.chargingIconSymbol}`}></i>
          </div>
        )}
        <span className={styles.batteryText}>{level}%</span>
      </div>
    </div>
  );
};

export default Battery;
