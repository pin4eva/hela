import mongoose, { model, Model } from "mongoose";
import { IUser } from "../types/User.type";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      required: true,
      min: [4, "Your username must be more than 4 characters"],
      max: [20, "Username must not exceed 12 characters"],
    },
    phone: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, min: 4 },
    token: String,
    role: { type: String, default: "user" },
    isActive: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    accountType: { type: String, default: "Regular" },
    rank: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    contact: { type: String, default: "" },
    status: { type: String, default: "" },
    plan: { type: String, default: "" },
    bio: { type: String, default: "" },
    image: { type: String, default: "http://placehold.jp/150x150.png" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

// export default mongoose.models?.User || mongoose.model("User", UserSchema);

const User: Model<IUser> = model("User", UserSchema);

export default User;
