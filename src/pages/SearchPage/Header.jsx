import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "@/assets/logo.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className={styles.headerContainer}>
      <img
        src={logo}
        alt="Logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <div className={styles.authButtons}>
        <button onClick={() => navigate("/login")} className={styles.loginBtn}>
          로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          className={styles.signupBtn}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
