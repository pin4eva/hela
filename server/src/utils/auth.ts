import config from "./config";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import { IUser } from "helpers/types/User.type";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

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

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
