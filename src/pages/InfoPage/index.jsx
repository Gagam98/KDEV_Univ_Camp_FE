import React, { useState, useEffect } from "react";
import Map from "@@/InfoPage/Map";
import Ticket from "@@/InfoPage/Ticket";
import Header from "@@/InfoPage/Header";
import { getUserInfo } from "@/api/signupApi";
import styles from "./InfoPage.module.css";
import AllVehicles from "@@/InfoPage/AllVehicles";

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
          {/* <div className={styles.mapSection}>
            <div className={styles.mapWrapper}>
              <Map />
            </div>
          </div> */}
          <div className={styles.distanceSection}>
            <Ticket />
            <AllVehicles />
          </div>
        </div>
      </div>
    </div>
  );
}
