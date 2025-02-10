import { BASE_URL } from "@/api/config";

/**
 * 로그인 요청 함수
 * @param {string} id - 사용자 아이디
 * @param {string} password - 사용자 비밀번호
 * @returns {object} 토큰과 닉네임 정보
 */
export const login = async (id, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
      credentials: "include", // 인증 정보 포함
    });

    if (!response.ok) {
      throw new Error("로그인 실패: " + response.statusText);
    }

    const data = await response.json();
    console.log("data", data, data.nickname);
    return { token: data.token, nickname: data.nickname };
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};
