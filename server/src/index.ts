import { ApolloServer } from "apollo-server-express";
import express from "express";
import { schema } from "./typeDefs";
import { connectDB } from "./utils/db";
import cors from "cors";
import cookieSession from "cookie-session";
import cookieParse from "cookie-parser";
import { authController } from "./controllers/authController";
import { reportController } from "./controllers/reportController";

const PORT = process.env.PORT || 8000;

const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use((_req, res, next) => {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Rest Routes

app.use("/api/auth", authController);
app.use("/api/reports", reportController);

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    let token = "";
    if (req.headers) token = req.headers.authorization;

    return {
      res,
      req,
      token,
    };
  },
});

apolloServer.applyMiddleware({ app, path: "/api/graphql", cors: false });

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
