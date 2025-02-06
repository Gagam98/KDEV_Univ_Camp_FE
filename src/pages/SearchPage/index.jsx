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
          <label className="search" htmlFor="inpt_search">
            <input id="inpt_search" type="text" />
          </label>
          <p>차량번호 검색하기</p>
        </div>
      </div>
    </div>
  );
}
