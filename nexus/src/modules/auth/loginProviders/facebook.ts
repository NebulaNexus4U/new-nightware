import { get } from "lodash";
import passport from "passport";

import { Strategy as FacebookStrategy } from "passport-facebook";

import { facebookOAuth } from "../../../common/constants";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookOAuth.clientID,
      clientSecret: facebookOAuth.clientSecret,
      callbackURL: facebookOAuth.callbackURL,
      profileFields: facebookOAuth.profileFields,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const loginProvider = get(profile, "provider", "");
      const email = get(profile, "_json.email", "");
      const avatar = get(profile, "_json.picture.data.url", "");
      const name = get(profile, "_json.name", "");

      const loginDetails = {
        loginProvider,
        name,
        email,
        accessToken,
        avatar,
      };
      const profileData = {
        ...profile,
        loginDetails,
      };

      return done(null, profileData);
    },
  ),
);
