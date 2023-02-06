import { Router } from "express";
import passport from "passport";

import { facebookOAuth, googleOAuth } from "../../common/constants";
import "./loginProviders/google";
import "./loginProviders/facebook";

const postAuthenticate = {
  successRedirect: "/login/signIn",
  failureRedirect: "/",
};

export default function loginRoutes() {
  const router = Router();

  router.route("/google").get(passport.authenticate("google", googleOAuth.params));
  router.route("/google/callback").get(passport.authenticate("google", postAuthenticate));

  router.route("/facebook").get(passport.authenticate("facebook", facebookOAuth.params));
  router.route("/facebook/callback").get(passport.authenticate("facebook", postAuthenticate));

  return router;
}
