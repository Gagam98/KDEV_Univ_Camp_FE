import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import styles from "./common.module.css";

export default function TotalDistance({ weeklyDistance }) {
  const chartRef = useRef(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [thisWeekDistances, setThisWeekDistances] = useState([]);
  const [lastWeekDistances, setLastWeekDistances] = useState([]);

  useEffect(() => {
    if (!weeklyDistance) return;

    setTotalDistance(weeklyDistance.totalDistance || 0);

    // 0을 `null`로 변환하여 차트에서 보이지 않도록 설정
    setThisWeekDistances(
      weeklyDistance.thisWeekDistances?.map((d) => (d === 0 ? null : d)) || []
    );
    setLastWeekDistances(weeklyDistance.lastWeekDistances || []);
  }, [weeklyDistance]);

  useEffect(() => {
    if (!thisWeekDistances.length && !lastWeekDistances.length) return;

    const chart = echarts.init(chartRef.current);

    chart.setOption({
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
          name: "이번 주",
          data: thisWeekDistances,
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
          markLine: {
            silent: true,
            symbol: "none",
            data: [
              {
                type: "average",
                name: "평균",
                label: {
                  show: false,
                },
                lineStyle: {
                  width: 2,
                  color: "rgba(0,0,0,0.3)",
                },
              },
            ],
          },
        },
        {
          name: "지난 주",
          data: lastWeekDistances,
          type: "bar",
          barWidth: "20%",
          itemStyle: {
            borderRadius: [100, 100, 0, 0],
            color: "rgba(0,0,0,0.3)",
          },
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, [thisWeekDistances, lastWeekDistances]);

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
      <h4>총 {totalDistance}km</h4>
      <div className={styles.chart} ref={chartRef}></div>
    </div>
  );
}
