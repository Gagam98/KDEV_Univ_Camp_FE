import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import { useUserStore } from "@/stores/user";
import styles from "./index.module.css";
import clsx from "clsx";

export default function Header({ search, color = "transparent" }) {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const nickname = useUserStore((state) => state.user?.nickname) || "";
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("click", offPopup);
    return () => window.removeEventListener("click", offPopup);
  }, []);

  function togglePopup(event) {
    event.stopPropagation();
    setIsShowPopup(!isShowPopup);
  }
  function onPopup(event) {
    event.stopPropagation();
    setIsShowPopup(true);
  }
  function offPopup() {
    setIsShowPopup(false);
  }

  function handleLogout() {
    localStorage.removeItem("userToken");

    navigate("/login");
  }

  return (
    <>
      <div className={styles.header} style={{ backgroundColor: color }}>
        <div className={styles.leftSection}>
          <Link className={styles.logoContainer} to="/search">
            <img src={logoImage} alt="Logo" className={styles.logoImage} />
          </Link>

          {search && (
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
            </div>
          )}
        </div>
        <div className={styles.rightSection}>
          <div className={styles.userInfo}>
            <div className={styles.nickname}>{nickname}</div>
            <div className={styles.popupContainer}>
              <div className={styles.avatarCircle} onClick={togglePopup}>
                {nickname?.charAt(0)}
              </div>
              <div
                className={clsx(styles.popup, isShowPopup && styles.showPopup)}
                onClick={onPopup}
              >
                <ul>
                  <li>사용자 정보</li>
                  <li onClick={handleLogout} className={styles.logoutButton}>
                    로그아웃
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
