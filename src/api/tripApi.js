import { BASE_URL } from "./config";

/**
 * 차량 이동 데이터를 검색하는 함수
 * @param {string} startDate - 검색 시작 날짜 (기본값: 전체기간)
 * @param {string} endDate - 검색 종료 날짜 (기본값: 전체기간)
 * @param {number} interval - 검색 주기 (기본값 60초)
 * @returns {Promise<object>} 검색 결과 데이터 (위도, 경도만 포함)
 */
export const searchTripData = async (startDate, endDate, interval = 60) => {
  try {
    const token = localStorage.getItem("userToken");

    const queryParams = new URLSearchParams();
    queryParams.append("startDate", startDate);
    queryParams.append("endDate", endDate);
    queryParams.append("interval", interval);

    const response = await fetch(
      `${BASE_URL}/api/trip/search?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`데이터를 검색할 수 없습니다: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      startDate,
      endDate,
      interval,
      tripData: data.map((trip) => ({
        latitude: trip.latitude,
        longitude: trip.longitude,
      })),
    };
  } catch (error) {
    console.error("🚨 API 요청 오류:", error);
    throw error;
  }
};
