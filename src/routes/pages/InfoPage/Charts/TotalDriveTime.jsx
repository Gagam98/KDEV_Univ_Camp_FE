import * as echarts from "echarts";
import { useState, useEffect, useRef } from "react";
import styles from "./common.module.css";
import clsx from "clsx";
import dayjs from "dayjs";

function getHour(hour) {
  const th = hour / 1000 / 60 / 60;
  const d = Number.parseInt(th / 24);
  const h = Number.parseInt(th % 24);
  return {
    day: d,
    hour: h,
    format: `${d > 0 ? `${d}d ` : ""}${h}h`,
  };
}

export default function TotalDriveTime({ carInfo }) {
  const dailyDrivingHours = carInfo.dailyDrivingTime;
  const totalDrivingHours = carInfo.totalDrivingTime;
  let chart = null;

  const [daily] = useState(getHour(dailyDrivingHours));
  const [total] = useState(getHour(totalDrivingHours));
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chart = echarts.init(chartRef.current);
      setChartOptions();
    }
  }, []);

  function setChartOptions() {
    chart?.setOption({
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      xAxis: {
        show: false,
      },
      series: [
        {
          type: "pie",
          radius: ["70%", "90%"],
          center: ["50%", "50%"],
          label: {
            show: true,
            position: "center",
            formatter: daily.format,
            color: "#000",
            fontSize: 30,
            fontWeight: "bold",
          },
          data: [
            {
              value: daily.hour,
              name: "일일 운행시간",
              itemStyle: { color: "#000" },
            },
            {
              value: 24 - daily.hour,
              name: "전체 운행시간",
              itemStyle: { color: "rgba(255,255,255,0.2)" },
              label: { show: false },
            },
          ],
        },
      ],
    });
  }

  return (
    <div className={styles.chartContainer}>
      <h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000"
        >
          <path d="M441-82Q287-97 184-211T81-480q0-155 103-269t257-129v120q-104 14-172 93t-68 185q0 106 68 185t172 93v120Zm80 0v-120q94-12 159-78t79-160h120q-14 143-114.5 243.5T521-82Zm238-438q-14-94-79-160t-159-78v-120q143 14 243.5 114.5T879-520H759Z" />
        </svg>
        운행시간
      </h3>
      <div className={clsx(styles.chart, styles.pieChart)}>
        <div className={styles.pieChartLabel}>
          <div>
            <label>전체 운행시간</label>
            <h4>{total.format}</h4>
          </div>
          <div>
            <label>일일 운행시간</label>
            <h4>{daily.format}</h4>
          </div>
        </div>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
}
