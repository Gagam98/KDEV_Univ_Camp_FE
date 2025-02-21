import { BASE_URL } from "./config";

/**
 * 차량 주간 주행거리 조회 함수
 * @param {string} carNumber - 조회할 차량 번호
 * @returns {Promise<object>} 주간 주행거리 정보
 */
export const totalDistance = async (carNumber) => {
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

    if (!data.weeklyDistance) {
      return { exists: false };
    }

    const processedData = {
      thisWeekDistances: data.weeklyDistance.thisWeekDistances || [],
      lastWeekDistances: data.weeklyDistance.lastWeekDistances || [],
      totalDistance: data.weeklyDistance.totalDistance ?? 0,
    };

    return { exists: true, data: processedData };
  } catch (error) {
    console.error("주간 주행거리 조회 에러:", error);
    throw error;
  }
};
