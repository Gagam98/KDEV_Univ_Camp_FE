import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "@@/SearchPage";
import LoginPage from "@@/LoginPage";
import SignupPage from "@@/SignupPage";
import InfoPage from "@@/InfoPage";
import styles from "@/App.module.css";

function App() {
  const [nickname, setNickname] = useState("");

  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setNickname={setNickname} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<LoginPage setNickname={setNickname} />} />
      </Routes>
    </div>
  );
}

export default App;
