import { BASE_URL } from "@/api/config";

/**
 * 로컬 스토리지에 토큰 및 닉네임 저장 함수
 * @param {string} token - 사용자 인증 토큰
 * @param {string} nickname - 사용자 닉네임
 */
const saveTokenToStorage = (token, nickname) => {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userNickname", nickname);
};

/**
 * 로그인 요청 함수
 * @param {string} id - 사용자 아이디 (토큰 형식)
 * @param {string} password - 사용자 비밀번호 (토큰 형식)
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
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("로그인 실패: " + response.statusText);
    }

    const data = await response.json();
    saveTokenToStorage(data.token, data.nickname);
    return { token: data.token, nickname: data.nickname };
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};
