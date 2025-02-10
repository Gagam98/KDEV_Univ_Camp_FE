import React, { useState, useEffect } from "react";
import { getUserInfo } from "@/api/signupApi";
import styles from "./Header.module.css";

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
    <div className={styles.infoPage}>
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>
        <span className={styles.nicknameDisplay}>
          {isLoading ? "Loading..." : nickname}
        </span>
        {nickname !== "Guest" && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
}
