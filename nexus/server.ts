import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const { PORT_NO, MONGO_URI } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

const db = mongoose.connection;

console.log("Nexus is Firing Up!");
db.on("error", console.error.bind(console, "Mongoose connection Error: "));
db.once("open", () => {
  // Todo: Import the routes here and also mongoose models
  app.get("/", (req, res) => res.status(200).send({ success: true, message: "Welcome to Nightmare's Nexus" }));

  app.listen(PORT_NO, () => console.log("Nexus is working & Listening on:", PORT_NO));
});
