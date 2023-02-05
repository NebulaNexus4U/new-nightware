import { get } from "lodash";
import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { googleOAuth } from "../../../common/constants";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleOAuth.clientID,
      clientSecret: googleOAuth.clientSecret,
      callbackURL: googleOAuth.callbackURL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const loginProvider = "google";
      const email = get(profile, "_json.email", "");
      const avatar = get(profile, "_json.picture", "");
      const name = get(profile, "_json.name", "");

      const loginDetails = {
        loginProvider,
        name,
        email,
        accessToken,
        avatar,
      };
      const dada = {
        ...profile,
        loginDetails,
      };

      return done(null, dada);
    },
  ),
);
