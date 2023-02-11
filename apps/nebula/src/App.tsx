import React, { useEffect } from "react";
import { TbBrandGoogle } from "react-icons/tb";
import { constants } from "new-nightmare-common";

const { oAuthSecrets } = constants;

const BASE_URL = import.meta.env.VITE_NEXUS_BASE_URL;

const composeGoogleAuthUrl = (options: any) => {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const qp = {
    access_type: "offline",
    prompt: "consent",
    response_type: "code",
    client_id: options.clientId,
    token: "",
    redirect_uri: options.callbackURL,
    state: options.state,
    service: "lso",
    o2v: 2,
    scope:
      "https://mail.google.com/ https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  };
  return baseUrl + "?" + serialize(qp);
};

const serialize = function (obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export default function App() {
  const [count, setCount] = React.useState(0);
  const [shouldOAuthWindowClose, setShouldOAuthWindowClose] = React.useState(false);

  const handleLoginSignIn = (provider: string) => {
    const oauthKeys = oAuthSecrets[provider as keyof typeof oAuthSecrets];

    auth(provider, oauthKeys);
  };

  const getAuthUrl = (provider: string, options: any) => {
    let authUrl = "";
    if (provider === "google") {
      authUrl = composeGoogleAuthUrl(options);
    }
    return authUrl;
  };

  const auth = (provider: string, options: any) => {
    const url = getAuthUrl(provider, options);
    const x = window.screen.width / 2 - 600 / 2;
    const y = window.screen.height / 2 - 600 / 2;

    const oAuthWindow = window.open(url, "Authentication", `width=600,height=600,left=${x},top=${y}`);

    const timer = setInterval(() => {
      console.log("oAuthWindow before: ", oAuthWindow);
      if (oAuthWindow?.closed) {
        // console.log("oAuthWindow: ", oAuthWindow.length);
        clearInterval(timer);
      }
    }, 1000);
    // window.open(url, "Authentication", `height=600,width=600,left=${x},top=${y}`);
  };

  return (
    <div className="flex justify-center items-center p-52 flex-col">
      <button
        className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        <span className="text-6xl">This is New Nightmare App</span>
      </button>
      <span className="text-6xl mt-4">{count}</span>

      <div>
        <span>
          <TbBrandGoogle className="text-7xl text-green-700" onClick={() => handleLoginSignIn("google")} /> Google Login
        </span>
      </div>
    </div>
  );
}
