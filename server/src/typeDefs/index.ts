import { makeExecutableSchema, gql } from "apollo-server-express";
import resolvers from "../resolvers";
import { ReportTypes } from "./reportTypes";
import { UserType } from "./userTypes";

const typeDefs = gql`
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, UserType, ReportTypes],
  resolvers: resolvers as any,
});
