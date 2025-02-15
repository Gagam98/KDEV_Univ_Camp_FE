import React, { useState, useCallback } from "react";
import { useKakaoMapLoader } from "@/hooks/useKakaoMapLoader";
import styles from "./locationDisplay.module.css";

const LocationDisplay = () => {
  const [location, setLocation] = useState("Loading...");

  const initializeLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (
              status === window.kakao.maps.services.Status.OK &&
              result.length > 0
            ) {
              const roadAddress = result[0].road_address?.address_name;
              const jibunAddress = result[0].address?.address_name;
              setLocation(roadAddress || jibunAddress || "Address not found");
            } else {
              setLocation("Unable to retrieve address.");
            }
          });
        },
        (error) => {
          setLocation("Unable to retrieve location.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }, []);

  useKakaoMapLoader(initializeLocation);

  return <div className={styles.locationDisplay}>{location}</div>;
};

export default LocationDisplay;
