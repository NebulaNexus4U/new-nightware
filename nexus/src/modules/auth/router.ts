import { Router } from "express";
import passport from "passport";

import { googleOAuth } from "../../common/constants";
import "./loginProviders/google";

const postAuthenticate = {
  successRedirect: "/login/signIn",
  failureRedirect: "/",
};

export default function loginRoutes() {
  const router = Router();

  router.route("/google").get(passport.authenticate("google", googleOAuth.params));
  router.route("/google/callback").get(passport.authenticate("google", postAuthenticate));

  return router;
}
