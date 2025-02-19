import { ScrollRestoration, Outlet } from "react-router-dom";
import appStyles from "@/App.module.css";

export default function DefaultLayout() {
  return (
    <>
      <ScrollRestoration />
      <div className={appStyles.appContainer}>
        <Outlet />
      </div>
    </>
  );
}
