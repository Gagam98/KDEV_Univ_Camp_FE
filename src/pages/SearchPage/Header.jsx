import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/api/signupApi.js";
import styles from "./Header.module.css";
import logo from "@/assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await getUserInfo();
        setNickname(userInfo.nickname);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    }
    fetchUserInfo();

    const timeout = setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.classList.add(styles.expand);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.headerContainer}>
      <img
        src={logo}
        alt="Logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <div className={styles.userInfo}>
        {nickname ? (
          <>
            <span className={styles.nickname}>{nickname}</span>
            <div className={styles.avatarCircle}>{nickname.charAt(0)}</div>
          </>
        ) : (
          <span className={styles.loading}>Loading...</span>
        )}
      </div>
    </div>
  );
}
