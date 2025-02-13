import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { login } from "@/api/loginApi";
import { useUserStore } from "@/stores/user";
import styles from "./login.module.css";

const LoginPage = () => {
  const logIn = useUserStore(state => state.logIn);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    const formData = new FormData(e.target);
    const id = formData.get("id");
    const password = formData.get("password");

    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      const user = await logIn(id, password)
      alert(`${user.nickname}님, 로그인 성공!`);
      navigate("/search");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            name="id"
            id="id"
            placeholder="아이디를 입력하세요"
            className={styles.inputField}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            className={styles.inputField}
          />
        </div>
        <button
          type="submit"
          className={styles.loginSubmitButton}
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <p className={styles.signupText}>
        아직 회원이 아닌가요?{" "}
        <span className={styles.signupLink} onClick={() => navigate("/signup")}>
          <strong>회원가입하기</strong>
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
