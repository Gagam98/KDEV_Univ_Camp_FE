import styles from "./Ticket.module.css";
import { useState, useEffect } from "react";
import carImage from "@/assets/car.png"; // 🚗 PNG 파일 불러오기

export default function Ticket() {
  const duration = 4;
  const [carPos, setCarPos] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCarPos(70);
    }, 200);
  }, [carPos]);

  return (
    <div className={styles.ticket}>
      <div className={styles.point}>
        <div className={styles.name}>서울</div>
        <div className={styles.time}>9:00 AM</div>
        <div className={styles.date}>2005-01-01</div>
      </div>

      <div className={styles.line}>
        <div
          className={styles.car}
          style={{ left: `${carPos}%`, transition: `left ${duration}s` }}
        >
          <img src={carImage} alt="Car" className={styles.carImage} />
        </div>
      </div>

      <div className={styles.point}>
        <div className={styles.name}>부산</div>
        <div className={styles.time}>11:00 PM</div>
        <div className={styles.date}>2005-03-24</div>
      </div>
    </div>
  );
}
