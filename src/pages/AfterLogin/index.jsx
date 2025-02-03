import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Map from "@/pages/Map/";
import Sidebar from "@/pages/GpsSidebar";
import IconMenu from "@/pages/GpsSidebar/IconMenu/IconMenu";
import "@/pages/Map/Map.css";
import "@/pages/GpsSidebar/IconMenu/IconMenu.css";

const AfterLogin = ({ nickname }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("기간검색");

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    navigate("/login");
  };

  // 로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            <IconMenu setActiveTab={setActiveTab} />
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              nickname={nickname}
              onLogout={handleLogout}
            />
            <div className="map-container">
              <Map />
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AfterLogin;
