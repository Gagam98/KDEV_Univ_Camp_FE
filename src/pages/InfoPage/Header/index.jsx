import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/api/signupApi";
import styles from "./Header.module.css";
import logoImage from "@/assets/logo.png";

export default function InfoPage() {
  const [nickname, setNickname] = useState("Guest");
  const [isLoading, setIsLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);

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
    setShowLogout(false);
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    if (showLogout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogout]);

  return (
    <div className={styles.infoPage} style={{ marginTop: 0, paddingTop: 0 }}>
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

        {nickname !== "Guest" && (
          <div className={styles.nicknameContainer}>
            <span className={styles.nicknameDisplay}>
              {isLoading ? "Loading..." : nickname}
            </span>
            <div
              className={styles.avatarCircle}
              onClick={() => setShowLogout(!showLogout)}
            >
              {nickname.charAt(0)}
            </div>
            {showLogout && (
              <div
                className={`${styles.logoutPopup} ${
                  showLogout ? styles.active : ""
                }`}
                ref={popupRef}
              >
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
