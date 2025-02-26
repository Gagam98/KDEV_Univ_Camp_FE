import { ScrollRestoration, Outlet } from "react-router-dom";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import appStyles from "@/App.module.css";

export default function DefaultLayout() {
  useScrollRestoration();

  return (
    <>
      <ScrollRestoration />
      <div className={appStyles.appContainer}>
        <Outlet />
      </div>
    </>
  );
}
