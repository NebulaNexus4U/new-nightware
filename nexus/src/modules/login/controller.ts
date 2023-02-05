import { Request, Response } from "express";
import { get, isEmpty } from "lodash";

import Models from "../../models";
import Logger from "../../common/logger";
import { compareTheHash, encryptIt, generateTheHash } from "../../common/utils/cryptoUtil";

const { Login } = Models;

/* Sing-Up Controller */
export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { loginMethod, name, email, password, accessToken, avatar } = req.body;

    // Checking Main Params for Processing the Signup is Prsent or Not
    if ([loginMethod, email].some((i) => isEmpty(i))) {
      return res.status(200).send({
        success: false,
        message: "Unable to Process the Request Missing one or more parameters!",
      });
    }

    // Checking if Account with Same Email Exists
    const loginExists = await Login.findOne({ email }).lean();

    if (loginExists) {
      return res.status(200).send({
        success: false,
        message: `Account already exists with ${email} Email.`,
        loginExists,
      });
    }

    let hashedPassword = "";
    let encryptedAccessToken = "";

    // Based on Login Methods encrypting / hasing the accessTokens
    if (loginMethod === "direct") {
      hashedPassword = await generateTheHash(password);
    } else {
      encryptedAccessToken = encryptIt(accessToken);
    }

    // Creating a Login
    await Login.create({
      name,
      email,
      avatar,
      loginMethod: {
        [loginMethod]:
          loginMethod === "direct" ? { accessToken: hashedPassword } : { accessToken: encryptedAccessToken },
      },
    });

    return res.status(200).send({
      success: true,
      message: `You have Successfully Signed Up with the ${email} Email`,
    });
  } catch (error) {
    Logger.info({ from: "Login_Controller_userSignUp()", errMsg: error.message });
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

/* Sign-In Controller */
export const userSignIn = async (req: Request, res: Response) => {
  try {
    const { loginMethod, email, password } = req.body;

    // Checking Main Params for Processing the Signup is Prsent or Not
    if ([loginMethod, email].some((i) => isEmpty(i))) {
      return res.status(200).send({
        success: false,
        message: "Unable to Process the Request Missing one or more parameters!",
      });
    }

    // Checking the Login Exists or not
    const loginExists = await Login.findOne({ email }).lean();

    if (!loginExists) {
      return res.status(200).send({
        success: false,
        message: "Account Doesn't Exits",
      });
    }

    // Based on the loginMethod Verifying the authenticity of the User
    if (loginMethod === "direct") {
      const hashedString = get(loginExists, `loginMethod.${loginMethod}.accessToken`, "");
      const accessTokenVerified = await compareTheHash(password, hashedString);

      if (!accessTokenVerified) {
        return res.status(200).send({
          success: false,
          message: "Incorrect Password",
        });
      }
    }

    return res.status(200).send({
      success: true,
      message: "Login Success",
      loginExists,
    });
  } catch (error) {
    Logger.error({ from: "Login_Controller_userSignIn()", errMsg: error.message });
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

    const hashedString = get(loginExists, "loginMethod.direct.accessToken", "");
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
      { $set: { "loginMethod.direct.accessToken": hashedPassword } },
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
  userSignUp,
  changePassword,
};
