import { BASE_URL } from "./config";

/**
 * 차량 주간 주행거리 조회 함수
 * @param {string} carNumber - 조회할 차량 번호
 * @returns {Promise<object>} 주간 주행거리 정보
 */
export const fetchWeeklyDistance = async (carNumber) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await fetch(
      `${BASE_URL}/api/vehicle-status/weekly-distance/${carNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return { exists: false };
      }
      const errorMessage = response.statusText
        ? ` (${response.statusText})`
        : "";
      throw new Error(
        `주간 주행거리 데이터를 찾을 수 없습니다: ${carNumber}${errorMessage}`
      );
    }

    const data = await response.json();

    // ✅ weeklyDistance 내부 값 추출 (이전 코드에서는 이 부분이 누락됨)
    if (!data.weeklyDistance) {
      return { exists: false };
    }

    const processedData = {
      thisWeekDistances: data.thisWeekDistances?.map((d) => d ?? 0) || [],
      lastWeekDistances: data.lastWeekDistances?.map((d) => d ?? 0) || [],
      totalDistance: data.totalDistance ?? 0,
    };

    return { exists: true, data: processedData };
  } catch (error) {
    console.error("주간 주행거리 조회 에러:", error);
    throw error;
  }
};
