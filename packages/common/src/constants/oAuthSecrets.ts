import { IOAuthSecrets } from "./constants";

export const google: IOAuthSecrets = {
  clientId: "625750956269-pohhrq3cnd84o04f5c2uq3f6hqlpd5ea.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:4000/api/auth/google/callback",
  params: { scope: ["email", "profile"] },
  state: true,
};

export const faceboook: IOAuthSecrets = {
  clientId: "585310313101357",
  clientSecret: "29e16df96509031a53a03f1fc51ec309",
  callbackURL: "http://localhost:4000/api/auth/facebook/callback",
  params: { scope: ["email", "user_location"] },
  profileFields: ["id", "displayName", "photos", "email"],
};
