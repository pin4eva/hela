import { Document } from "mongoose";

enum accountType {
  Regular = 1,
  Student = 0,
  Lawyer = 2,
}

export interface IUser extends Document {
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  token: string;
  role: string;
  isActive: boolean;
  verified: boolean;
  accountType: accountType;
  rank: number;
  points: number;
  contact: number;
  status: string;
  plan: string;
  bio: string;
  image: string;
}
