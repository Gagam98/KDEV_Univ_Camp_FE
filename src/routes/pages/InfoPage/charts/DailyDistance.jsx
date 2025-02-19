import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import styles from "./common.module.css";
import { searchCarInfo } from "@/api/carApi";

/**
 * millisecond 단위를 시간으로 변환하는 함수
 * @param {number} hour - 밀리초 단위의 시간 값
 * @returns {object} 변환된 시간 값 (일, 시간, 포맷 문자열)
 */
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

export default function DailyDistance({ carNumber }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [hourlyDistances, setHourlyDistances] = useState([]);
  const [dailyDrivingTime, setDailyDrivingTime] = useState({ format: "0h" });

  useEffect(() => {
    if (!carNumber) return;

    async function fetchCarInfo() {
      try {
        const response = await searchCarInfo(carNumber);
        if (response.exists) {
          const data = response.data;
          const hourlyData = data.hourlyDistances?.[0]?.distances || [];
          const convertedTime = getHour(data.dailyDrivingTime || 0);

          setHourlyDistances(hourlyData);
          setDailyDrivingTime(convertedTime);
        }
      } catch (error) {
        console.error("일일 주행거리 조회 실패:", error);
      }
    }

    fetchCarInfo();
  }, [carNumber]);

  useEffect(() => {
    if (!hourlyDistances.length) return;

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
          data: [
            "0~2",
            "2~4",
            "4~6",
            "6~8",
            "8~10",
            "10~12",
            "12~14",
            "14~16",
            "16~18",
            "18~20",
            "20~22",
            "22~24",
          ],
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
            name: "시간대별 주행거리",
            data: hourlyDistances,
            type: "bar",
            barWidth: "30%",
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
        ],
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [hourlyDistances]);

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
        일일 주행거리
      </h3>
      <h4>총 {dailyDrivingTime.format}</h4>
      <div className={styles.chart} ref={chartRef}></div>
    </div>
  );
}
