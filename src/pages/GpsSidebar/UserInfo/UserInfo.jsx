import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import "./UserInfo.css";

const UserInfo = () => {
  const navigate = useNavigate(); // navigate를 직접 가져옴

  return (
    <div className="user-info">
      <img src={logo} alt="Logo" className="user-icon" />
      <div className="auth-buttons">
        <button className="auth-button" onClick={() => navigate("/login")}>
          로그인
        </button>
        <button className="auth-button" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
