import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { requiresAuth } from "./loaders";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import InfoPage from "./pages/InfoPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/login"),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/info",
    loader: requiresAuth,
    element: <InfoPage />,
  },
  {
    path: "/search",
    loader: requiresAuth,
    element: <SearchPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
