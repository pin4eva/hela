import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import fetch from "isomorphic-unfetch";
import jscookie from "js-cookie";
import { NextPageContext } from "next";
import { useMemo } from "react";
import { HTTP_URI, TOKEN_NAME, WS_URI } from "utils/constants";
import { getTokenCookie } from "utils/cookieUtils";

let apolloClient: ApolloClient<any>;

// if (process.browser) {
//     global.fetch = fetch;
// }

// const WS_URI = "ws://localhost:3000/api/graphql";
// const HTTP_URI = "http://localhost:3000/api/graphql";

const createLink = (initialState: any, token: string) => {
  const cookie = process.browser ? jscookie.get(TOKEN_NAME) : token;
  const httpLink = createHttpLink({
    uri: `${HTTP_URI}/api/graphql`,
    fetch,
    headers: {
      Authorization: cookie ? `Bearer ${cookie}` : " ",
    },
  });

  const wsLink: any = process.browser
    ? new WebSocketLink({
        uri: `${WS_URI}/api/graphql`,
        options: {
          reconnect: true,
          lazy: true,
          timeout: 20000,

          connectionParams: () => ({
            header: {
              Authorization: cookie ? `Bearer ${cookie}` : " ",
            },
          }),
        },
      })
    : null;

  const link = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link,
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

export const initializeApollo = (
  initialState?: any,
  ctx?: NextPageContext
): ApolloClient<any> => {
  const cookie = getTokenCookie(ctx?.req);
  if (!process.browser) return createLink(initialState, cookie);
  if (!apolloClient) {
    apolloClient = createLink(initialState, cookie);
  }

  return apolloClient;
};

export const useApollo = (initialState: any): ApolloClient<any> => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
