import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [carNumber, setCarNumber] = useState("00가 0000");
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((userInfo) => setNickname(userInfo.nickname || "Guest"));
  }, []);

  useEffect(() => {
    searchCarInfo("12가1234").then((result) => {
      if (result.exists) {
        setCarNumber(result.data.carNumber);
      }
    });
  }, []);

  return (
    <div>
      <div className={styles.mainContent}>
        <Header nickname={nickname} />

        <div className={styles.infoContent}>
          <h2 className={styles.vehicleNumber}>{carNumber}</h2>

          <div className={styles.mapSection}>
            <div className={styles.mapWrapper}>
              <Map />
            </div>
          </div>
        </div>

        <Ticket />
        <TotalDistance />
        <DailyDistance />
        <TotalDriveTime />
      </div>
    </div>
  );
}
