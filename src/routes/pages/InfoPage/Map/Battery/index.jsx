import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./Battery.module.css";

const Battery = ({ level, isCharging, remainingTime }) => {
  const isLowBattery = level < 30 && !isCharging;

  return (
    <div className={styles.batteryContainer}>
      {(isCharging || isLowBattery) && (
        <div className={styles.batteryStatus}>
          {isCharging ? (
            <>
              <span className={styles.chargingIcon}>⚡</span>
              <span className={styles.chargingText}>충전중...</span>
            </>
          ) : (
            <>
              <span className={styles.warningIcon}>⚠</span>
              <span className={styles.warningText}>충전 필요!</span>
            </>
          )}
        </div>
      )}

      <div className={styles.batteryInfo}>
        <span className={styles.batteryLevel}>{level}%</span>
        {remainingTime && (
          <span className={styles.remainingTime}>
            • {remainingTime} min left
          </span>
        )}
      </div>

      <div className={styles.batteryBarContainer}>
        <div className={styles.batteryScale}>
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        <div className={styles.batteryBar}>
          <div
            className={`${styles.batteryFill} ${
              isLowBattery && styles.lowBattery
            }`}
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Battery;
