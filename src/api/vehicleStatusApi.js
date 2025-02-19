import { BASE_URL } from "./config";

export const fetchVehicleStatus = async () => {
  try {
    const token = localStorage.getItem("userToken");

    const response = await fetch(`${BASE_URL}/api/vehicle-status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API 요청 실패: ${response.status} ${response.statusText}`
      );
    }

    return { exists: true, data: await response.json() };
  } catch (error) {
    console.error("🚨 차량 상태 조회 실패:", error);
    return { exists: false };
  }
};
