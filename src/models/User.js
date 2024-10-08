import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
