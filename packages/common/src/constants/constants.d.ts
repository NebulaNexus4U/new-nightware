export interface IOAuthSecrets {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
  params?: { scope?: string[] };
  state?: boolean;
  profileFields?: string[];
}
