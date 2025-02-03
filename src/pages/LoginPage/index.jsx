import React, { useState, useRef } from "react";
import { login } from "@/api/loginApi";
import "@/pages/LoginPage/login.css";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setNickname }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      const response = await login(username, password);
      const { token, nickname } = response;
      /*console.log(response);*/
      localStorage.setItem("token", token);
      localStorage.setItem("nickname", nickname);
      setNickname(nickname);
      alert(`${nickname}님, 로그인 성공!`);
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);
      setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">아이디</label>
          <input
            ref={usernameRef}
            type="text"
            id="username"
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
        <button
          type="submit"
          className="login-submit-button"
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
