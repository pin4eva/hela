import config from "./config";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import { IUser } from "../types/User.type";

export const authentication = async (token: string): Promise<IUser> => {
  if (!token) {
    throw new Error("No token provided");
  } else {
    const data: any = jwt.verify(token, config.SECRET);
    if (data) {
      const user: IUser = await User.findOne(
        { _id: data?._id },
        { password: 0 }
      );
      return user;
    } else {
      throw new Error("Invalid token");
    }
  }
};
