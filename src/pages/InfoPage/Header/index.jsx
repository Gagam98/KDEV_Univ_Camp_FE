import React, { useState, useEffect } from "react";
import { getUserInfo } from "@/api/signupApi";
import "@@/InfoPage/infoPage.css";

export default function InfoPage() {
  const [username, setUsername] = useState("Guest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserInfo()
      .then(({ nickname }) => setUsername(nickname || "Guest"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="info-page">
      <div className="header">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <span className="username-display">
          {isLoading ? "Loading..." : username}
        </span>
        {username !== "Guest" && (
          <button onClick={() => console.log("로그아웃되었습니다.")}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
