import React from "react";
import "@@/InfoPage/Distance/Distance.module.css";
import s from "./Distance.module.css";
import clsx from "clsx";

const Distance = () => {
  return (
    <div className={s.distanceTicket}>
      <div className={s.distanceSection}>
        <span className={clsx(s.location, s.start)}>서울</span>
        <div className={s.trainPath}>
          <span className={s.trainIcon}>🚂</span>
          <span className={s.date}>2025-02-01</span>
        </div>
        <span className={clsx(s.location, s.end)}>부산</span>
      </div>
      <div className={s.distanceInfo}>
        <span className={s.time}>9:00 AM</span>
        <span className={s.dateLabel}>2025-02-01</span>
        <span className={s.time}>10:00 PM</span>
        <span className={s.dateLabel}>2025-03-01</span>
      </div>
    </div>
  );
};

export default Distance;
