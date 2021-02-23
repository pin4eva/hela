import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "src/types/User.type";
import User from "../models/UserModel";
import config from "../utils/config";

import * as express from "express";
const router = express.Router();

const auth = async (token: string) => {
  try {
    const data = jwt.verify(token, config.SECRET);
    return data;
  } catch (error) {
    return error;
  }
};

router.get("/me", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const data = await auth(token);
    const user = await User.findById(data._id);
    const me = {
      id: user.id,
      image: user.image,
      name: user.name,
      email: user.email,
    };
    res.status(200).json(me);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("Fill the email and password");
  const user: IUser = await User.findOne({ email });
  if (!user) {
    return res.status(500).json({ msg: "No record found" });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(500).json({ msg: "Incorrect email or password" });
    // throw Error("Incorrect email or password");
  }
  const payload = {
    _id: user._id,
  };
  try {
    const token: any = jwt.sign(payload, config.SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      // expires: new Date(Date.now() + 8 * 360000),
      httpOnly: process.env.NODE_ENV === " production ",
      secure: process.env.NODE_ENV === " production ",
      sameSite: "lax",
    });
    // req.session = {
    //   auth: token,
    // };
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      role: user.role,
    };

    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
    throw new Error(error);
  }
});

export { router as authController };
