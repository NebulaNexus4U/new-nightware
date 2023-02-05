import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

import { multerUploadDest, bodyParserLimit } from "./constants";

const { NODE_ENV } = process.env;

const multerDiskStorageConf = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, multerUploadDest);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

export default function expressApp() {
  const app = express();
  const upload = multer({ storage: multerDiskStorageConf }); // Multer for Handling the form-data

  app.use(bodyParser.json({ limit: bodyParserLimit }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cookieParser());
  app.use(cors());
  app.use(upload.any());

  // Morgan Logger Catching the 400 and 500 status
  app.use(
    morgan(`${NODE_ENV !== "production" ? "dev" : "combined"}`, {
      skip(req, res) {
        return res.statusCode < 400;
      },
    }),
  );

  return app;
}
