import reportResolver from "./reportResolver";
import userResolver from "./userResolver";

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...reportResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...reportResolver.Mutation,
  },
  Subscription: {},
};

export default resolvers;
