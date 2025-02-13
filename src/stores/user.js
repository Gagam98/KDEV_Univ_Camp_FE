import { create } from "zustand";
import { BASE_URL } from "@/api/config";

export const useUserStore = create((set) => ({
  user: null,
  /**
   * 로그인 요청 함수
   * @param {string} id - 사용자 아이디 (토큰 형식)
   * @param {string} password - 사용자 비밀번호 (토큰 형식)
   * @returns {object} 토큰과 닉네임 정보
   */
  logIn: async (id, password) => {
    const res = await fetch(`${BASE_URL}/api/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });
    const data = await res.json();
    
    if (data.token) {
      console.log(data)
      localStorage.setItem("userToken", data.token);
      set({
        user: {
          nickname: data.nickname
        }
      })
      return data
    }

    let message = "로그인에 실패했습니다. 다시 시도해주세요."
    // if (메시지 출력 조건을 추가하세요!) {
    //   message = "아이디 또는 비밀번호가 일치하지 않습니다."
    // }

    throw new Error(message);
  }
}));
