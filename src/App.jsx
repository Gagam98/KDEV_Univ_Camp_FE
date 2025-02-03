import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "@@/LoginPage";
import SignupPage from "@@/SignupPage";
import ProtectedRoutes from "@@/AfterLogin";
import "./App.css";
import AfterLogin from "./pages/AfterLogin";

const App = () => {
  const [nickname, setNickname] = useState("");

  // 로그인 상태 관리
  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) setNickname(savedNickname);
  }, []);

  return (
    <Routes>
      {/* 로그인 및 회원가입 페이지 */}
      <Route path="/login" element={<LoginPage setNickname={setNickname} />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 로그인 후 보호된 페이지 */}
      <Route path="/*" element={<AfterLogin nickname={nickname} />} />
    </Routes>
  );
};

export default App;
