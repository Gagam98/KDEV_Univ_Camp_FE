import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchCarInfo } from "@/api/carApi";
import Header from "@/components/Header";
import Navigation from "./Navigation";
import Map from "./Map";
import Ticket from "./Ticket";
import styles from "./common.module.css";
import TotalDistance from "./charts/TotalDistance.jsx";
import DailyDistance from "./charts/DailyDistance.jsx";
import TotalDriveTime from "./charts/TotalDriveTime.jsx";

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

            <div id="ticketSection">
              <Ticket carInfo={carInfo} />
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
