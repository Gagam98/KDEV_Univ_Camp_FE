import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import styles from "./SearchPage.module.css";
import "./search.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const searchRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      searchRef.current.classList.remove("mini");
      searchRef.current.querySelector("input")?.focus();
    }, 1500);
  }, []);

  return (
    <div className={styles.pageBackground}>
      <Header />
      <div className={styles.cntr}>
        <div
          className={styles.cntrInnr}
          style={{ transform: "translateY(-100px)" }}
        >
          <div className={styles.searchTitleText}>차량번호를 입력하세요.</div>
          <div id="main-search" class="mini" ref={searchRef}>
            <input type="text" />
            <button>검색</button>
          </div>
        </div>
      </div>
    </div>
  );
}
