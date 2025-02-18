import { BASE_URL } from "./config";

/**
 * 전체 차량 상태 조회 API
 * @returns {Promise<object>} 차량 상태 데이터
 */
export const fetchVehicleStatus = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/vehicle-status`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`차량 상태 조회 실패: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      exists: true,
      data: {
        operatingVehicles: data.operatingVehicles ?? 0,
        unmonitoredVehicles: data.unmonitoredVehicles ?? 0,
        nonOperatingVehicles: data.nonOperatingVehicles ?? 0,
        totalVehicles: data.totalVehicles ?? 0,
      },
    };
  } catch (error) {
    console.error("차량 상태 조회 에러:", error);
    return { exists: false, error: error.message };
  }
};
