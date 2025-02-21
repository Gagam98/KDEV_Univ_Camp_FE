import { BASE_URL } from "./config";

/**
 * 차량 이동 데이터를 검색하는 함수
 * @param {string} carNumber - 조회할 차량 번호 (필수)
 * @param {string} startDate - 검색 시작 날짜 (YYYY-MM-DD, 선택)
 * @param {string} endDate - 검색 종료 날짜 (YYYY-MM-DD, 선택)
 * @param {number} interval - 검색 주기 (기본값: 60초)
 * @returns {Promise<object>} 검색 결과 데이터 (위도, 경도 포함)
 */
export const searchTripData = async (
  carNumber,
  startDate,
  endDate,
  interval = 60
) => {
  try {
    if (!carNumber) {
      throw new Error("🚨 차량 번호가 필요합니다.");
    }

    const token = localStorage.getItem("userToken");

    const queryParams = new URLSearchParams();
    queryParams.append("carNumber", carNumber); // ✅ 차량 번호 추가

    // ✅ 날짜 값이 있는 경우만 추가
    if (startDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      queryParams.append("startDate", startDate);
    }
    if (endDate && /^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      queryParams.append("endDate", endDate);
    }

    queryParams.append("interval", interval);

    // ✅ API 요청 실행
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

    // ✅ 응답이 정상적이지 않을 경우 예외 처리
    if (!response.ok) {
      throw new Error(`데이터를 검색할 수 없습니다: ${response.statusText}`);
    }

    // ✅ JSON 데이터 변환
    const data = await response.json();

    return {
      carNumber,
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
