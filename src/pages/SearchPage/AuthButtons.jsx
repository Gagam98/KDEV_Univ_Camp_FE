import { useNavigate } from "react-router-dom";
import "@@/SearchPage/AuthButtons.css";

export default function AuthButtons() {
  const navigate = useNavigate();

  return (
    <div className="auth-buttons">
      <button onClick={() => navigate("/login")} className="login-btn">
        로그인
      </button>
      <button onClick={() => navigate("/signup")} className="signup-btn">
        회원가입
      </button>
    </div>
  );
}
