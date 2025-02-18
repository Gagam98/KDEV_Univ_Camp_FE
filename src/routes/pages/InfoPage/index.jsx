import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchCarInfo } from "@/api/carApi";
import Header from "@/components/Header";
import Navigation from "./Navigation";
import Map from "./Map";
import Ticket from "./Ticket";
import styles from "./common.module.css";
import TotalDistance from "./charts/TotalDistance";
import DailyDistance from "./charts/DailyDistance";
import TotalDriveTime from "./charts/TotalDriveTime";

export default function InfoPage() {
  const { carNumber } = useParams();
  const [carInfo, setCarInfo] = useState(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const { data } = await searchCarInfo(carNumber);
    setCarInfo(data);
  }

  return (
    <div>
      <div className={styles.mainContent}>
        <Header color="rgba(0, 0, 0, 0.5)" />
        <Navigation />
        {carInfo && (
          <>
            <div className={styles.vehicleNumber}>
              <h2 id="numberSection" className={styles.vehicleNumber}>
                {carNumber}
              </h2>

              <div className={styles.mapSection}>
                <div className={styles.mapWrapper}>
                  <Map carInfo={carInfo} />
                </div>
              </div>
            </div>

            <div id="ticketSection" className={styles.ticketContainer}>
              <h2>대여 및 반납장소</h2>
            </div>
            <Ticket carInfo={carInfo} />

            <div id="driveStats" className={styles.ticketContainer}>
              <h2>주행거리 및 운행시간</h2>
            </div>
            <div id="driveStats" className={styles.driveStatus}>
              <TotalDistance carInfo={carInfo} />
              <DailyDistance carInfo={carInfo} />
              <TotalDriveTime carInfo={carInfo} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
