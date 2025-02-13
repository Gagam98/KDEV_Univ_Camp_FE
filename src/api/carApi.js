import { BASE_URL } from "./config";

/**
 * 차량 정보 조회 함수
 * @param {string} carNumber - 조회할 차량 번호
 * @returns {Promise<object>} 차량 정보
 */
export const searchCarInfo = async (carNumber) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await fetch(
      `${BASE_URL}/api/vehicle-status/details/${carNumber}`,
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
      throw new Error("차량 조회에 실패했습니다: " + response.statusText);
    }

    const data = await response.json();
    return { exists: true, data };
  } catch (error) {
    console.error("차량 조회 에러:", error);
    throw error;
  }
};
