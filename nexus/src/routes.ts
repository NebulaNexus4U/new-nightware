import { Router } from "express";

export default function allRoutes() {
  const router = Router();

  /* Add Alll Other Routes Here */

  router.get("/", (req, res) => res.status(200).send({ status: true, message: "Welcome to New Nightmare's Nexus" }));

  return router;
}
