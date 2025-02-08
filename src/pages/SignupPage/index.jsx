import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅 import
import { signup } from "@/api/signupApi"; // 회원가입 API 호출 함수 import
import "@/pages/SignupPage/signup.css"; // 스타일 import

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const idRef = useRef(); // 아이디 입력 필드 참조
  const passwordRef = useRef(); // 비밀번호 입력 필드 참조
  const nicknameRef = useRef(); // 닉네임 입력 필드 참조
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = idRef.current.value; // 아이디 값 가져오기
    const password = passwordRef.current.value; // 비밀번호 값 가져오기
    const nickname = nicknameRef.current.value; // 닉네임 값 가져오기

    if (!id || !password || !nickname) {
      alert("아이디, 비밀번호, 닉네임을 모두 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      await signup(id, password, nickname); // 회원가입 API 호출
      alert("회원가입 성공!");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 에러:", error);
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <h1>회원가입</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            ref={idRef}
            type="text"
            id="id"
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input
            ref={nicknameRef}
            type="text"
            id="nickname"
            placeholder="닉네임을 입력하세요"
          />
        </div>
        <button
          type="submit"
          className="signup-submit-button"
          disabled={loading}
        >
          {loading ? "회원가입 중..." : "회원가입"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
