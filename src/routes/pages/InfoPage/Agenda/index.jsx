import { useState, useEffect } from "react";
import agendaStyles from "./Agenda.module.css";
import infoStyles from "../InfoPage.module.css";

export default function Agenda() {
  const [isHidden, setIsHidden] = useState(false);
  const [toggleOpacity, setToggleOpacity] = useState(0); // 초기에는 투명

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300; // 최대 스크롤 기준값 (조절 가능)
      const opacityValue = Math.min(scrollY / maxScroll, 1); // 스크롤 값에 따라 오퍼시티 변화

      if (scrollY > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setToggleOpacity(opacityValue);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <button
        className={agendaStyles.toggleButton}
        onClick={() => setIsHidden(false)}
        style={{ opacity: toggleOpacity }}
      >
        ☰
      </button>

      <nav
        className={`${infoStyles.infoContent} ${
          isHidden ? agendaStyles.hidden : ""
        }`}
      >
        <button
          className={agendaStyles.closeButton}
          onClick={() => setIsHidden(true)}
        >
          ✖
        </button>
        <h2 className={infoStyles.vehicleNumber}>바로가기</h2>
        <ul className={agendaStyles.list}>
          <li
            onClick={() =>
              document
                .getElementById("mapSection")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            지도
          </li>
          <li
            onClick={() =>
              document
                .getElementById("ticketSection")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            장소 및 시간
          </li>
          <li
            onClick={() =>
              document
                .getElementById("driveStats")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            주행거리 및 운행시간
          </li>
        </ul>
        <div
          className={agendaStyles.fullMap}
          onClick={() => (window.location.href = "/map")}
        >
          전체 지도
        </div>
      </nav>
    </div>
  );
}
