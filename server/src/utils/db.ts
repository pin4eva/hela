import mongoose from "mongoose";
import config from "./config";

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
let cachedDB: typeof mongoose | null = null;
export const connectDB = async (): Promise<typeof mongoose> => {
  if (cachedDB) return cachedDB;
  try {
    const db = await mongoose.connect(config.MONGO_URI, options);
    cachedDB = db;
    console.log(`db connected: ${db.connection.host}`);

    return db;
  } catch (error) {
    console.log(error.message);
  }
};

export const disconnectdb = async (): Promise<void> => {
  await mongoose.disconnect().then(() => console.log(`db disconnected`));
};
