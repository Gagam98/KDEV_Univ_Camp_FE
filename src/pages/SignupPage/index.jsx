import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "@/api/signupApi";
import "@/pages/SignupPage/signup.css";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const idRef = useRef();
  const passwordRef = useRef();
  const nicknameRef = useRef();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = idRef.current.value;
    const password = passwordRef.current.value;
    const nickname = nicknameRef.current.value;

    if (!id || !password || !nickname) {
      alert("아이디, 비밀번호, 닉네임을 모두 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      await signup(id, password, nickname);
      alert("회원가입 성공!");
      navigate("/login");
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
