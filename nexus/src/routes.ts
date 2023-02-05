import { Router } from "express";

import loginRoutes from "./modules/login/router";
import authRoutes from "./modules/auth/router";

export default function allRoutes() {
  const router = Router();

  /* Add Alll Other Routes Here */
  router.use("/login", loginRoutes());
  router.use("/auth", authRoutes());

  router.get("/", (req, res) =>
    res.status(200).send("<a  href='/auth/google'  target='popup' >Facebook Authenticate</a>"),
  );

  return router;
}
