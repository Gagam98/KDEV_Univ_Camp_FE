import { useEffect, useState } from "react";
import { fetchVehicleStatus } from "@/api/vehicleStatusApi";
import styles from "./CarStatus.module.css";

const STATUS_TYPES = [
  { label: "전체 차량", key: "totalVehicles", color: "#e74c3c" },
  { label: "운행중 차량", key: "operatingVehicles", color: "#2c786c" },
  { label: "미운행 차량", key: "nonOperatingVehicles", color: "#1e4bd7" },
  { label: "미관제 차량", key: "unmonitoredVehicles", color: "#8B8B8B" },
];

export default function CarStatus() {
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await fetchVehicleStatus();
      if (response.exists) {
        setVehicleData(response.data);
      }
    }

    loadData();
  }, []);

  if (!vehicleData) {
    return <div className={styles.loading}>데이터 로딩 중...</div>;
  }

  return (
    <div className={styles.carStatusContainer}>
      {STATUS_TYPES.map(({ label, key, color }) => (
        <div key={key} className={styles.statusItem}>
          <span className={styles.statusLabel}>{label}</span>
          <strong className={styles.statusValue}>
            {vehicleData[key].toLocaleString()}
          </strong>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{
                width: `${
                  vehicleData.totalVehicles
                    ? (vehicleData[key] / vehicleData.totalVehicles) * 100
                    : 0
                }%`,
                backgroundColor: color,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
