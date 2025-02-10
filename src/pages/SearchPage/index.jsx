import { useEffect } from "react";
import { initializeSearchInput, cleanupSearchInput } from "@/api/SearchApi";
import AuthButtons from "@@/SearchPage/Header";
import styles from "@@/SearchPage/SearchPage.module.css";

export default function SearchPage() {
  useEffect(() => {
    initializeSearchInput();
    return () => {
      cleanupSearchInput();
    };
  }, []);

  return (
    <div className={styles.pageBackground}>
      <div className={styles.cntr}>
        <AuthButtons />
        <div className={styles.cntrInnr}>
          <div className={styles.searchTitleText}>차량번호를 입력하세요.</div>
          <label className={styles.search} htmlFor="inpt_search">
            <span className={styles.searchButton}>검색</span>
            <input id="inpt_search" type="text" />
          </label>
        </div>
      </div>
    </div>
  );
}
