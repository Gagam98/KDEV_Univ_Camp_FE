import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchCarInfo } from "@/api/carApi";
import Header from "@/components/Header";
import Navigation from "./Navigation";
import Map from "./Map";
import Ticket from "./Ticket";
import styles from "./InfoPage.module.css";
import TotalDistance from "./charts/TotalDistance";
import DailyDistance from "./charts/DailyDistance";
import TotalDriveTime from "./charts/TotalDriveTime";

export default function InfoPage() {
  const { carNumber } = useParams();

  useEffect(() => {
    searchCarInfo(carNumber);
  }, []);

  return (
    <div>
      <div className={styles.mainContent}>
        <Header color="rgba(0, 0, 0, 0.5)" />
        <Navigation />
        <div className={styles.vehicleNumber}>
          <h2 id="numberSection" className={styles.vehicleNumber}>
            {carNumber}
          </h2>

          <div className={styles.mapSection}>
            <div className={styles.mapWrapper}>
              <Map />
            </div>
          </div>
        </div>

        <div id="ticketSection">
          <Ticket />
        </div>

        <div id="driveStats" className={styles.driveStatus}>
          <TotalDistance />
          <DailyDistance />
          <TotalDriveTime />
        </div>
      </div>
    </div>
  );
}
