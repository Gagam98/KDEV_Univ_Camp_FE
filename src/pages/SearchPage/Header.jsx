import { useNavigate } from "react-router-dom";
import "@@/SearchPage/Header.css";
import logo from "@/assets/logo.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="auth-buttons">
        <button onClick={() => navigate("/login")} className="login-btn">
          로그인
        </button>
        <button onClick={() => navigate("/signup")} className="signup-btn">
          회원가입
        </button>
      </div>
    </div>
  );
}
