import * as dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/hela-1",
  SECRET: process.env.SECRET || "kjdnsdlkdslkm",
  AUTH_USER: "pin4eva@gmail.com",
};
