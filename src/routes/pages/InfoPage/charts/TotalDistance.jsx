import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import styles from "./common.module.css";

export default function TotalDistance() {
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
        top: "10%",
        bottom: "10%",
      },
      xAxis: {
        type: "category",
        data: ["M", "T", "W", "T", "F", "S", "S"],
        axisLabel: {
          color: "#000",
        },
        axisLine: false,
        axisTick: false,
      },
      yAxis: {
        type: "value",
        show: false,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          barWidth: "40%",
          itemStyle: {
            borderRadius: [100, 100, 0, 0],
            color: "#000",
          },
          label: {
            show: true,
            position: "top",
            formatter: "{c}",
            color: "#000",
            fontSize: 12,
            distance: 4,
          },
        },
        {
          data: [85, 165, 198, 120, 45, 151, 80],
          type: "bar",
          barWidth: "20%",
          itemStyle: {
            borderRadius: [100, 100, 0, 0],
            color: "rgba(0,0,0,0.3)",
          },
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
          fill="#000"
        >
          <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
        </svg>
        주행거리
      </h3>
      <h4>총 236.0km</h4>
      <div className={styles.chart} ref={chartRef}></div>
    </div>
  );
}
