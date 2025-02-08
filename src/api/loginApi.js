import { BASE_URL } from "@/api/config";

export const login = async (id, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    if (!response.ok) {
      throw new Error("로그인 실패: " + response.statusText);
    }

    const data = await response.json();
    return { token: data.token, nickname: data.nickname };
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};
