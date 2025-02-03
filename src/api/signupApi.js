import { BASE_URL } from "@/api/config";

export const signup = async (username, password, nickname) => {
  try {
    const response = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        nickname, // 입력받은 닉네임 값 전달
      }),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};
