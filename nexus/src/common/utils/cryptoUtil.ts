import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { ENCRYPTION_SECRET_KEY, JWT_SECRET_KEY } = process.env;

export const encryptIt = (data: object | string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_SECRET_KEY).toString();
};

export const decryptIt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_SECRET_KEY);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  return JSON.parse(plaintext);
};

export const jwtSignIt = (data: string) => {
  return jwt.sign(data, JWT_SECRET_KEY, { expiresIn: "1y" });
};

export const jwtVerifyIt = (data: string) => {
  return jwt.verify(data, JWT_SECRET_KEY);
};

export const generateTheHash = async (str: string) => {
  const salt = await bcrypt.genSalt(10);

  const hashedToken = await bcrypt.hash(str, salt);

  return hashedToken;
};

export const compareTheHash = async (str: string, hash: string) => {
  const comparedHashed = await bcrypt.compare(str, hash);

  return comparedHashed;
};
