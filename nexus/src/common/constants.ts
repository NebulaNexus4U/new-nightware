// Constants Getting Used on express.ts
export const multerUploadDest = "/nexus/src/uploads/";
export const bodyParserLimit = "5mb";

// Other Constants if Any Goies Here with there FileName

export const googleOAuth = {
  clientID: "625750956269-pohhrq3cnd84o04f5c2uq3f6hqlpd5ea.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:4000/auth/google/callback",
  params: { scope: ["email", "profile"] },
  state: true,
};
