import React from "react";
import Map from "@@/InfoPage/Map";
import "@@/InfoPage/infoPage.css";

export default function InfoPage() {
  return (
    <div className="info-page">
      <h1>info</h1>
      <div className="map-wrapper">
        <Map />
      </div>
    </div>
  );
}
