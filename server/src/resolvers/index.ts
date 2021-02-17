import userResolver from "./userResolver";

const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
  Subscription: {},
};

export default resolvers;
