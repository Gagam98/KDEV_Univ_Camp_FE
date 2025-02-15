import styles from "./CarStatus.module.css";

const STATUS_TYPES = [
  { label: "전체 차량", key: "total", color: "#e74c3c" },
  { label: "운행중 차량", key: "active", color: "#2c786c" },
  { label: "미운행 차량", key: "inactive", color: "#1e4bd7" },
  { label: "미관제 차량", key: "unmonitored", color: "#8B8B8B" },
];

export default function CarStatus(props) {
  return (
    <div className={styles.carStatusContainer}>
      {STATUS_TYPES.map(({ label, key, color }) => (
        <div key={key} className={styles.statusItem}>
          <div
            className={styles.statusIndicator}
            style={{ backgroundColor: color }}
          ></div>
          <span>{label}</span>
          <strong>{props[key].toLocaleString()}</strong>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{
                width: `${(props[key] / props.total) * 100}%`,
                backgroundColor: color,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
