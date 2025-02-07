import React from "react";
import Map from "@@/InfoPage/Map";
import Distance from "@@/InfoPage/Distance";
import "@@/InfoPage/infoPage.css";

export default function InfoPage() {
  return (
    <div className="info-page">
      <h1>Info</h1>
      <div className="map-container">
        <div className="map-wrapper">
          <Map />
        </div>
        <Distance />
      </div>
    </div>
  );
}
