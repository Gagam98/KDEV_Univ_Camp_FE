import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "@/assets/logo.png";
import { useUserStore } from "@/stores/user";

export default function Header() {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const nickname = useUserStore(state => state.user.nickname);

  useEffect(() => {
    setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.classList.add(styles.expand);
      }
    }, 500);
  }, []);

  return (
    <div className={styles.headerContainer}>
      <Link to="/search">
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
        />
      </Link>
      <div className={styles.userInfo}>
        <div className={styles.nickname}>{nickname}</div>
        <div className={styles.avatarCircle}>{nickname.charAt(0)}</div>
      </div>
    </div>
  );
}
