import { Router } from "express";

import controller from "./controller";

export default function loginRoutes() {
  const router = Router();

  router.route("/signIn").post(controller.userSignIn);
  router.route("/signUp").post(controller.userSignUp);
  router.route("/changePassword/:email").post(controller.changePassword);

  return router;
}
