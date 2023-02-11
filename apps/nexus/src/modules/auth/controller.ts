import axios from "axios";
import { Request, Response } from "express";
import { constants } from "new-nightmare-common";

const { oAuthSecrets } = constants;

const closeWindowHtml = "<script>window.close();</script>";
export const processCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  const { google } = oAuthSecrets;

  try {
    const tokenResponse = await axios({
      url: "https://accounts.google.com/o/oauth2/token",
      method: "POST",
      params: {
        client_id: google.clientId,
        client_secret: google.clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: google.callbackURL,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = tokenResponse;
    const authorization = `${"Bearer"} ${data.access_token}`;
    const config = {
      method: "get",
      url: "https://www.googleapis.com/gmail/v1/users/me/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    };
    const userEmail = await axios(config);
    const tokens = {
      ...data,
      userEmail: userEmail.data.emailAddress,
    };

    return res.status(200).send(closeWindowHtml);
  } catch (err) {
    return res.status(500).send(err.config.url);
  }
};

export default {
  processCallback,
};
