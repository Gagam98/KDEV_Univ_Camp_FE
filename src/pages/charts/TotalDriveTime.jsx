import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import "./common.module.css";
import clsx from "clsx";

export default function TotalDriveTime() {
  let chart = null;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chart = echarts.init(chartRef.current);
    }
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
            formatter: "7.0h",
            color: "#fff",
            fontSize: 30,
            fontWeight: "bold",
          },
          data: [
            {
              value: 7,
              name: "일일 운행시간",
              itemStyle: { color: "#fff" },
            },
            {
              value: 24 - 7,
              name: "전체 운행시간",
              itemStyle: { color: "rgba(255,255,255,0.2)" },
              label: { show: false },
            },
          ],
        },
      ],
    });
  }, []);

  return (
    <div className={styles.chartContainer}>
      <h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M441-82Q287-97 184-211T81-480q0-155 103-269t257-129v120q-104 14-172 93t-68 185q0 106 68 185t172 93v120Zm80 0v-120q94-12 159-78t79-160h120q-14 143-114.5 243.5T521-82Zm238-438q-14-94-79-160t-159-78v-120q143 14 243.5 114.5T879-520H759Z" />
        </svg>
        운행시간
      </h3>
      <div className={clsx(styles.chart, styles.pieChart)}>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
}
