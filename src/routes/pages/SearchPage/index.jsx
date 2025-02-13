import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCarInfo } from "@/api/carApi";
import Header from "@/components/Header";
import styles from "./SearchPage.module.css";
import "./search.css";

export default function SearchPage() {
  const navigate = useNavigate();

  const searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      searchRef.current.classList.remove("mini");
      searchRef.current.querySelector("input")?.focus();
    }, 500);
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const carNumber = formData.get("carNumber");

    if (!carNumber) {
      alert("차량번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await searchCarInfo(carNumber);

      if (!result.exists) {
        // 차량이 존재하지 않는 경우 ErrorPage로 이동
        navigate("/error", {
          state: {
            message: "차량을 찾을 수 없습니다.",
            carNumber,
          },
        });
      } else {
        // 차량이 존재하는 경우 InfoPage로 이동
        navigate(`/info/${carNumber}`, {
          state: {
            carInfo: result.data,
          },
        });
      }
    } catch (error) {
      console.error("검색 에러:", error);
      setError(error.message || "차량 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.pageBackground}>
      <Header />
      <div className={styles.cntr}>
        <div
          className={styles.cntrInnr}
          style={{ transform: "translateY(-80px)" }}
        >
          <div className={styles.searchTitleText}>차량번호를 입력하세요.</div>
          <form onSubmit={handleSearch}>
            <div id="main-search" className="mini" ref={searchRef}>
              <input
                name="carNumber"
                placeholder="예:12가1234"
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? "검색 중..." : "검색"}
              </button>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
