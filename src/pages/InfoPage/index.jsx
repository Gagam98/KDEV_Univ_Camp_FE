import React, { useState, useEffect } from "react";
import Map from "@@/InfoPage/Map";
import Distance from "@@/InfoPage/Distance";
import Header from "@@/InfoPage/Header";
import Sidebar from "@@/InfoPage/Sidebar";
import { getUserInfo } from "@/api/signupApi";
import styles from "./InfoPage.module.css";

export default function InfoPage() {
  const [nickname, setNickname] = useState("Guest");

  useEffect(() => {
    getUserInfo().then((userInfo) => setNickname(userInfo.nickname || "Guest"));
  }, []);

  return (
    <div className={styles.infoPageContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header nickname={nickname} />
        <div className={styles.infoContent}>
          <div className={styles.mapSection}>
            <div className={styles.mapWrapper}>
              <Map />
            </div>
          </div>
          <div className={styles.distanceSection}>
            <Distance />
          </div>
        </div>
      </div>
    </div>
  );
}
