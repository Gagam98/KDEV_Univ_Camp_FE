import { BASE_URL } from "@/api/config";

export const signup = async (id, password, nickname) => {
  try {
    const response = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password, nickname }),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user-info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("사용자 정보 가져오기 실패: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("사용자 정보 가져오기 에러:", error);
    throw error;
  }
};
