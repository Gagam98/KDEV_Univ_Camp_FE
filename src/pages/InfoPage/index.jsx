import React, { useState, useEffect } from "react";
import Map from "@@/InfoPage/Map";
import Ticket from "@@/InfoPage/Ticket";
import Header from "@@/InfoPage/Header";
import { getUserInfo } from "@/api/signupApi";
import styles from "./InfoPage.module.css";
import AllVehicles from "@@/InfoPage/AllVehicles";
import clsx from "clsx";
import TotalDistance from "@@/charts/TotalDistance";
import DailyDistance from "@@/charts/DailyDistance";
import TotalDriveTime from "@@/charts/TotalDriveTime";

export default function InfoPage() {
  const [nickname, setNickname] = useState("Guest");

  useEffect(() => {
    getUserInfo().then((userInfo) => setNickname(userInfo.nickname || "Guest"));
  }, []);

  return (
    <div className={styles.infoPageContainer}>
      <div className={styles.mainContent}>
        <Header nickname={nickname} />

        <div className={styles.infoContent}>
          <h2 className={styles.vehicleNumber}>12가 1234</h2>

          <div className={styles.mapSection}>
            <div className={styles.mapWrapper}>
              <Map />
            </div>
          </div>

          <div className={styles.distanceSection}>
            <Ticket />
            <AllVehicles />
          </div>

          <div className={styles.dashboard}>
            <div className={clsx(styles.item, styles.colSpan2)}></div>
            <div
              className={clsx(styles.item, styles.colSpan2)}
              style={{ borderRadius: "100px", zIndex: -1 }}
            >
              <Ticket />
            </div>
            <div className={clsx(styles.item, styles.rowSpan2)}></div>
            <div className={styles.item}>
              <TotalDistance />
            </div>
            <div className={styles.item}>
              <DailyDistance />
            </div>
            <div className={styles.item}>
              <TotalDriveTime />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
