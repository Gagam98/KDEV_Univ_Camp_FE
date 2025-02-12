// @/src/api/carApi.js
import { BASE_URL } from "./config";

/**
 * 차량 정보 조회 함수
 * @param {string} carNumber - 조회할 차량 번호
 * @returns {Promise<object>} 차량 정보
 */
export const searchCar = async (carNumber) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/cars/search?number=${carNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return { exists: false }; // 차량이 없는 경우
      }
      throw new Error("차량 조회에 실패했습니다: " + response.statusText);
    }

    const data = await response.json();
    return { exists: true, data }; // 차량이 있는 경우
  } catch (error) {
    console.error("차량 조회 에러:", error);
    throw error;
  }
};
