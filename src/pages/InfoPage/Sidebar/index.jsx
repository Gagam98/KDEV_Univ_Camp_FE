import React from "react";
import styles from "./Sidebar.module.css";
import logo from "@/assets/logo.png";

const Sidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
    </div>
  );
};

export default Sidebar;
