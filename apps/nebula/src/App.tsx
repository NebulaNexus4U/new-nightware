import { RouterProvider } from "react-router-dom";

import { Navbar } from "./components";
import { newNightmareRoutes, themeColor } from "./Router";

export default function App() {
  return (
    <div className="h-screen">
      <Navbar color={themeColor} />
      <div
        className={`relative bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-400 min-h-[89.9vh] flex items-center justify-center`}
      >
        <RouterProvider router={newNightmareRoutes} />
      </div>
    </div>
  );
}
