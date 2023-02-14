import { RouterProvider } from "react-router-dom";

import { Navbar } from "./components";
import { newNightmareRoutes, themeColor } from "./Router";

export default function App() {
  return (
    <div className="h-screen">
      <Navbar color={themeColor} />
      <div className={`relative bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-400 min-h-full`}>
        <RouterProvider router={newNightmareRoutes} />
      </div>
    </div>
  );
}
