import { RecoilRoot } from "recoil";
import { useApollo } from "apollo";
import "styles/index.scss";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
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
