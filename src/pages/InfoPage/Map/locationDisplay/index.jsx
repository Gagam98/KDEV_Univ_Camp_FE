import React, { useEffect, useState } from "react";
import "@@/InfoPage/Map/LocationDisplay/LocationDisplay.css";

const LocationDisplay = () => {
  const [location, setLocation] = useState("Loading...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(
            `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(
              5
            )}`
          );
        },
        (error) => {
          setLocation("Unable to retrieve location.");
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }, []);

  return <div className="location-display">{location}</div>;
};

export default LocationDisplay;
