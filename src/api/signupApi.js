import { BASE_URL } from "@/api/config";

/**
 * 회원가입 요청 함수
 * @param {string} id - 사용자 아이디
 * @param {string} password - 사용자 비밀번호
 * @param {string} nickname - 사용자 닉네임
 * @returns {object} 회원가입 결과 데이터
 */
export const signup = async (id, password, nickname) => {
  try {
    const response = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password, nickname }),
      credentials: "include", // 인증 정보 포함
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

/**
 * 사용자 정보 가져오기 요청 함수
 * @returns {object} 사용자 정보 데이터
 */
export const getUserInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user-info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      credentials: "include", // 인증 정보 포함
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
