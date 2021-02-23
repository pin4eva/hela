import React from "react";
import { RecoilRoot } from "recoil";
import { useApollo } from "apollo";
import "styles/index.scss";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";
import Router from "next/router";
import Nprogress from "nprogress";
import "react-mde/lib/styles/css/react-mde-all.css";

Router.events.on("routeChangeStart", () => {
  Nprogress.start();
});
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  const client = useApollo(pageProps.apollo);
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
};

export default MyApp;
