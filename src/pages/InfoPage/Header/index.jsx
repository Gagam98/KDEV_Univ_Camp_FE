import React, { useState, useEffect } from "react";
import { getUserInfo } from "@/api/signupApi";
import "@@/InfoPage/infoPage.css";

export default function InfoPage() {
  const [nickname, setNickname] = useState("Guest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserInfo()
      .then(({ nickname }) => setNickname(nickname || "Guest"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    setNickname("Guest");
    console.log("로그아웃되었습니다.");
  };

  return (
    <div className="info-page">
      <div className="header">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <span className="nickname-display">
          {isLoading ? "Loading..." : nickname}
        </span>
        {nickname !== "Guest" && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
}
