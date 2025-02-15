import { ScrollRestoration, Outlet } from "react-router-dom";

export default function () {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
