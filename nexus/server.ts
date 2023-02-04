import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import Logger from "./common/logger";

const { PORT_NO, MONGO_URI } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

const db = mongoose.connection;

Logger.info("Nexus is Firing Up!");

db.on("error", (err) => Logger.error(err.message));
db.once("open", () => {
  global.Logger = Logger;

  // Todo: Import the routes here and also mongoose models
  app.get("/", (req, res) => res.status(200).send({ success: true, message: "Welcome to Nightmare's Nexus" }));

  app.listen(PORT_NO, () => Logger.info(`Nexus is working & Listening on: ${PORT_NO}`));
});
