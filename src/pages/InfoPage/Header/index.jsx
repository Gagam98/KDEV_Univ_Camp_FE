import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/api/signupApi";
import styles from "./Header.module.css";
import logoImage from "@/assets/logo.png";

export default function InfoPage() {
  const [nickname, setNickname] = useState("Guest");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
        <div className={styles.leftSection}>
          <div className={styles.logoContainer} onClick={() => navigate("/")}>
            <img src={logoImage} alt="Logo" className={styles.logoImage} />
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.nicknameContainer}>
          <span className={styles.nicknameDisplay}>
            {isLoading ? "Loading..." : nickname}
          </span>
          <div className={styles.avatarCircle}>
            {nickname.charAt(0).toUpperCase()}
          </div>
          {nickname !== "Guest" && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
