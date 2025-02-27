import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import styles from "./common.module.css";

export default function TotalDistance({ weeklyDistance }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [thisWeekDistances, setThisWeekDistances] = useState([]);
  const [lastWeekDistances, setLastWeekDistances] = useState([]);

  useEffect(() => {
    if (!weeklyDistance) return;

    setTotalDistance(weeklyDistance.totalDistance || 0);
    setThisWeekDistances(weeklyDistance.thisWeekDistances || []);
    setLastWeekDistances(weeklyDistance.lastWeekDistances || []);
  }, [weeklyDistance]);

  useEffect(() => {
    if (!thisWeekDistances.length && !lastWeekDistances.length) return;

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      chartInstance.current = echarts.init(chartRef.current);

      chartInstance.current.setOption({
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
              formatter: (params) => (params.value !== 0 ? params.value : ""),
              color: "#000",
              fontSize: 12,
              distance: 5,
            },
            markLine: {
              silent: true,
              symbol: "none",
              data: [
                {
                  type: "average",
                  name: "평균",
                  lineStyle: {
                    width: 2,
                    color: "rgba(0,0,0,0.3)",
                  },
                  label: {
                    show: false,
                    position: "end",
                    formatter: "평균: {c}",
                    color: "#000",
                    fontSize: 12,
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

      const handleResize = () => {
        if (chartInstance.current) {
          chartInstance.current.resize();
        }
      };
      window.addEventListener("resize", handleResize);

      return () => {
        if (chartInstance.current) {
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
        window.removeEventListener("resize", handleResize);
      };
    }
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
        주간 주행거리
      </h3>
      <h4>총 {totalDistance}km</h4>
      <div className={styles.chart} ref={chartRef}></div>
    </div>
  );
}
