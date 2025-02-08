import React, { useState, useEffect } from "react";
import Map from "@@/InfoPage/Map";
import Distance from "@@/InfoPage/Distance";
import Header from "@@/InfoPage/Header";
import { getUserInfo } from "@/api/signupApi";
import "@@/InfoPage/infoPage.css";

export default function InfoPage() {
  const [nickname, setNickname] = useState("Guest");

  useEffect(() => {
    getUserInfo().then((userInfo) => setNickname(userInfo.nickname || "Guest"));
  }, []);

  return (
    <div className="info-page">
      <Header
        username={nickname}
        userInitial={nickname.charAt(0).toUpperCase()}
      />
      <div className="info-content">
        <div className="map-section">
          <div className="map-wrapper">
            <Map />
          </div>
        </div>
        <div className="distance-section">
          <Distance />
        </div>
      </div>
    </div>
  );
}
