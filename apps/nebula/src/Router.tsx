import { createBrowserRouter } from "react-router-dom";

export const themeColor = import.meta.env.VITE_THEME_COLOR || "blue";

import { ErrorPage } from "./components";
import { AboutUs, Home, Blog, SignUp, ContactUs } from "./modules";

export const newNightmareRoutes = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage color={themeColor} />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <AboutUs />,
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "contact",
    element: <ContactUs />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);
