import { Router } from "express";

import controller from "./controller";

export default function loginRoutes() {
  const router = Router();

  router.route("/signIn").all(controller.userSignIn);
  router.route("/changePassword/:email").post(controller.changePassword);

  return router;
}
