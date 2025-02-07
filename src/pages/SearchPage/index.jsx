import { useEffect } from "react";
import { initializeSearchInput, cleanupSearchInput } from "@/api/SearchApi";
import AuthButtons from "@@/SearchPage/Header";
import "@@/SearchPage/Header.css";
import "@@/SearchPage/Search.css";

export default function SearchPage() {
  useEffect(() => {
    initializeSearchInput();

    return () => {
      cleanupSearchInput();
    };
  }, []);

  return (
    <div className="page-background">
      <div className="cntr">
        <AuthButtons />
        <div className="cntr-innr">
          <div className="search-title-text">차량번호를 입력하세요.</div>
          <label className="search" htmlFor="inpt_search">
            <span className="search-button">검색</span>
            <input id="inpt_search" type="text" />
          </label>
        </div>
      </div>
    </div>
  );
}
