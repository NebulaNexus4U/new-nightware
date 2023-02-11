import { Request, Response } from "express";
import { get, isEmpty } from "lodash";

import Models from "../../models";
import Logger from "../../common/logger";
import { compareTheHash, encryptIt, generateTheHash } from "../../common/utils/cryptoUtil";

const { Login } = Models;

interface ILoginData {
  loginProvider: string;
  email: string;
  accessToken: string;
  name?: string;
  refreshToken?: string;
  avatar?: string;
  password?: string;
}

/* Sing-Up Controller */
export const userSignIn = async (req: Request, res: Response) => {
  try {
    const { loginProvider, name, email, accessToken, avatar, password }: ILoginData = get(
      req,
      "user.loginDetails",
      req.body,
    );

    // Checking Main Params for Processing the Signup is Prsent or Not
    if ([loginProvider, email].some((i) => isEmpty(i))) {
      return res.status(200).send({
        success: false,
        message: "Unable to Process Please Refresh and Try Again!",
      });
    }

    let hashedPassword = "";
    let encryptedAccessToken = "";

    // Based on Login Methods encrypting / hasing the accessTokens
    if (loginProvider === "direct") {
      hashedPassword = await generateTheHash(password);
    } else {
      encryptedAccessToken = encryptIt(accessToken);
    }

    const findOneUser = await Login.findOne({ email }).lean();

    const findQ = { email };
    const updateQ = {
      $set: {
        email,
        name,
        avatar,
        loginProvider: {
          ...(!isEmpty(findOneUser) && findOneUser.loginProvider),
          [loginProvider]:
            loginProvider === "direct" ? { accessToken: hashedPassword } : { accessToken: encryptedAccessToken },
        },
      },
    };
    const options = { new: true, upsert: true };

    const userData = await Login.findOneAndUpdate(findQ, updateQ, options).lean();

    return res.status(200).send({
      success: true,
      message: `You have Successfully Signed Up with the ${email} Email`,
      userData,
    });
  } catch (error) {
    Logger.info({ from: "Login_Controller_userSignUp()", errMsg: error.message });
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { newPassword, oldPassword } = req.body;
  const { email } = req.params;

  try {
    const loginExists = await Login.findOne({ email }).lean();

    const hashedString = get(loginExists, "loginProvider.direct.accessToken", "");
    const accessTokenVerified = await compareTheHash(oldPassword, hashedString);

    if (!accessTokenVerified) {
      return res.status(200).send({
        success: false,
        message: "Incorrect Old Password",
      });
    }

    const hashedPassword = await generateTheHash(newPassword);

    const updatePassword = await Login.findOneAndUpdate(
      { email },
      { $set: { "loginProvider.direct.accessToken": hashedPassword } },
      { new: true },
    ).lean();

    if (!updatePassword) {
      return res.status(200).json({
        success: false,
        message: `Unable to Change Password for ${email} Email.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `You have Successfully Chnage the Password ${email} Email`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  userSignIn,
  changePassword,
};
