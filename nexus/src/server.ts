import "dotenv/config";

import mongoose from "mongoose";
import { MongoClient } from "mongodb";

import Logger from "./common/logger";
import expressApp from "./common/express";
import expressRoutes from "./routes";

const { PORT_NO, MONGO_URI } = process.env;

const mongoDbNative = new MongoClient(MONGO_URI);

(async () => {
  try {
    Logger.info("Nexus is Starting!");

    const app = expressApp();

    // MongoDb Native Conn to nexus-data database
    await mongoDbNative.connect();
    global.MongoDb = mongoDbNative.db("nexus-data");

    // Mongoose Conn
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI);

    // eslint-disable-next-line global-require
    require("./models");
    // All Express Routes
    app.use(expressRoutes());

    app.listen(PORT_NO, () => Logger.info(`Nexus is started & Listening on Port No: ${PORT_NO}`));
  } catch (error) {
    await mongoDbNative.close();
    await mongoose.disconnect();
    Logger.error({ from: "server.ts", errMessage: error });
  }
})();
