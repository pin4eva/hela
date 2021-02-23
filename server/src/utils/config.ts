import * as dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/hela-1",
  SECRET: process.env.SECRET || "kjdnsdlkdslkm",
  AUTH_USER: "pin4eva@gmail.com",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
