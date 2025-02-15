import { useState, useRef, useCallback } from "react";
import { useKakaoMapLoader } from "@/hooks/useKakaoMapLoader";
import Header from "@/components/Header";
import CarStatus from "@/routes/pages/MapPage/CarStatus";
import styles from "./index.module.css";

export default function MapPage() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  const initMap = useCallback(() => {
    if (!mapContainer.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 12,
    };

    const newMap = new window.kakao.maps.Map(mapContainer.current, options);
    newMap.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TERRAIN);
    newMap.setZoomable(true);
    setMap(newMap);
  }, []);

  useKakaoMapLoader(initMap);

  return (
    <div className={styles.MapPage}>
      <Header color="rgba(0, 0, 0, 0)" />
      <div className={styles.carStatusContainer}>
        <CarStatus
          total={3975}
          active={1978}
          inactive={1997}
          unmonitored={500}
        />
      </div>
      <div ref={mapContainer} className={styles.mapContainer}></div>
    </div>
  );
}
