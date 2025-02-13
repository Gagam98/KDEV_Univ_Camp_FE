import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import "./common.module.css";

export default function DailyDistance() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
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
            color: "#fff",
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
            data: [85, 132, 45, 167, 98, 223, 156, 78, 189, 112, 145, 92],
            type: "bar",
            barWidth: "40%",
            itemStyle: {
              borderRadius: [100, 100, 0, 0],
              color: "#fff",
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}",
              color: "#fff",
              fontSize: 12,
              distance: 4,
            },
            markLine: {
              silent: true,
              symbol: "none",
              data: [
                {
                  type: "average",
                  name: "",
                  label: {
                    show: false,
                  },
                  lineStyle: {
                    width: 2,
                    color: "rgba(255,255,255,0.3)",
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
      }
    };
  }, []);

  return (
    <div className="chartContainer">
      <h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
        </svg>
        일일 주행거리
      </h3>
      <h4>총 100.0km</h4>
      <div className="chart" ref={chartRef}></div>
    </div>
  );
}
