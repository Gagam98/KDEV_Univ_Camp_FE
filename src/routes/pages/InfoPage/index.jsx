import React, { useState, useEffect } from "react";
import Map from "@@/InfoPage/Map";
import Ticket from "@@/InfoPage/Ticket";
import Header from "@@/InfoPage/Header";
import { getUserInfo } from "@/api/signupApi";
import { searchCarInfo } from "@/api/carApi";
import styles from "./InfoPage.module.css";
import AllVehicles from "@@/InfoPage/AllVehicles";
import clsx from "clsx";
import TotalDistance from "@@/infoPage/charts/TotalDistance";
import DailyDistance from "@@/infoPage/charts/DailyDistance";
import TotalDriveTime from "@@/infoPage/charts/TotalDriveTime";

export default function InfoPage() {
  const [nickname, setNickname] = useState("Guest");
  const [carNumber, setCarNumber] = useState("");

  useEffect(() => {
    getUserInfo().then((userInfo) => setNickname(userInfo.nickname || "Guest"));
  }, []);

  useEffect(() => {
    searchCarInfo("12가1234").then((result) => {
      if (result.exists) {
        setCarNumber(result.data.carNumber);
      } else {
        setCarNumber("차량 정보 없음");
      }
    });
  }, []);

  return (
    <div className={styles.infoPageContainer}>
      <div className={styles.mainContent}>
        <Header nickname={nickname} />

        <div className={styles.infoContent}>
          <h2 className={styles.vehicleNumber}>{carNumber}</h2>

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
