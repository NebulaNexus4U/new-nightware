import { useState } from "react";

import classNames from "classnames";

const theme: INavbarThemeType = {
  base: "w-full shadow font-semibold sticky top-0 z-50",
  children: "flex h-full flex-col justify-center p-6 ",
  color: {
    red: "bg-gradient-to-r from-red-500 to-red-400",
    green: "bg-gradient-to-r from-green-500 to-green-400",
    yellow: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    blue: "bg-gradient-to-r from-blue-500 to-blue-400",
    pink: "bg-gradient-to-r from-pink-500 to-pink-400",
    gray: "bg-gradient-to-r from-gray-500 to-gray-400",
    orange: "bg-gradient-to-r from-orange-500 to-orange-400",
  },
};

export default function NavBar(props: INavbarProps) {
  const { children, className, href, color = "blue", ...restProps } = props;

  const [navbar, setNavbar] = useState(false);

  return (
    <nav className={classNames(theme.base, theme.color[color], className)}>
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <h2 className="text-2xl font-bold text-white">New Nightmare</h2>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"}`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-black">
                <a href="/">Home</a>
              </li>
              <li className="text-white hover:text-black">
                <a href="/blog">Blog</a>
              </li>
              <li className="text-white hover:text-black">
                <a href="/about">About Us</a>
              </li>
              <li className="text-white hover:text-black">
                <a href="/contact">Contact Us</a>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden md:hidden">
              <a
                href="/signin"
                className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          <a href="/signin" className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
            Sign In
          </a>
          <a href="/signup" className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
}
