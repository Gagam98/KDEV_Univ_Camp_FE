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
import MapPage from "./pages/MapPage";
import DefaultLayout from "./layouts/Default";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
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
        path: "/info/:carNumber",
        loader: requiresAuth,
        element: <InfoPage />,
      },
      {
        path: "/map",
        loader: requiresAuth,
        element: <MapPage />,
      },
      {
        path: "/search",
        loader: requiresAuth,
        element: <SearchPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
