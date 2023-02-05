import { Router } from "express";

import loginRoutes from "./modules/login/router";

export default function allRoutes() {
  const router = Router();

  /* Add Alll Other Routes Here */
  router.use("/login", loginRoutes());

  router.get("/", (req, res) => res.status(200).send({ success: true, message: "Welcome to New Nightmare's Nexus" }));

  return router;
}
