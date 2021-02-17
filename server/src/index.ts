import { ApolloServer } from "apollo-server-express";
import express from "express";
import { schema } from "./typeDefs";
import { connectDB } from "./utils/db";

const PORT = process.env.PORT || 8000;

const app = express();

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

apolloServer.applyMiddleware({ app, path: "/api/graphql" });

const start = async () => {
  await connectDB();
  try {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
