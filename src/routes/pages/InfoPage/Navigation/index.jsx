import agendaStyles from "./index.module.css";
import infoStyles from "../InfoPage.module.css";

export default function Navigation() {
  const menuItems = [
    { id: "numberSection", label: "지도" },
    { id: "ticketSection", label: "장소 및 시간" },
    { id: "driveStats", label: "주행거리 및 운행시간" },
  ];

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <nav className={infoStyles.infoContent}>
        <h2 className={infoStyles.vehicleNumber}>목록</h2>
        <ul className={agendaStyles.list}>
          {menuItems.map((item) => (
            <li key={item.id} onClick={() => handleScroll(item.id)}>
              {item.label}
            </li>
          ))}
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
