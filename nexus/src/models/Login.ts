import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

interface ILogin {
  name: string;
  email: string;
  loginMethod: object;
  avatar?: string;
}

interface IAuthKeys {
  accessToken: string;
  refreshToken?: string;
}

const authKeysSchema = new Schema<IAuthKeys>({
  accessToken: {
    type: String,
    required: true,
    trim: true,
  },
  refreshToken: {
    type: String,
    trim: true,
  },
});

const loginSchema = new Schema<ILogin>(
  {
    name: {
      type: String,
      reqyured: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    loginMethod: {
      type: Map,
      of: authKeysSchema,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, id: false, collection: "logins" },
);

loginSchema.plugin(paginate);
loginSchema.index({ email: 1 });

const Login = model<ILogin>("Login", loginSchema);

export default Login;
