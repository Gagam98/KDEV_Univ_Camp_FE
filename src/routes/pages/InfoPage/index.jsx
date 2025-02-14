import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchCarInfo } from "@/api/carApi";
import Header from "@/components/Header";
import Agenda from "./Agenda";
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
        <Header search color="#000" />
        <Agenda />
        <div className={styles.vehicleNumber}>
          <h2 className={styles.vehicleNumber}>{carNumber}</h2>

          <div id="mapSection" className={styles.mapSection}>
            <div className={styles.mapWrapper}>
              <Map />
            </div>
          </div>
        </div>

        <div id="ticketSection">
          <Ticket />
        </div>

        <div id="driveStats">
          <TotalDistance />
          <DailyDistance />
          <TotalDriveTime />
        </div>
      </div>
    </div>
  );
}
