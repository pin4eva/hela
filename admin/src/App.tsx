import { gql, useQuery } from "@apollo/client";
import { TOKEN_NAME } from "apollo";
import { ReportCount } from "atoms/ReportsAtom";
import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import cookie from "js-cookie";
import React, { useEffect } from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "styles/index.scss";
import { HTTP_URI } from "utils/constants";
import Routes from "./routes";

const COUNT_REPORT = gql`
  {
    getReportCount
  }
`;

function App() {
  const user = useRecoilValue(UserAtom);
  const setUser = useSetRecoilState(UserAtom);
  const setReportCount = useSetRecoilState(ReportCount);
  const token = cookie.get(TOKEN_NAME);

  useQuery(COUNT_REPORT, {
    onCompleted: (data) => setReportCount(data.getReportCount),
    onError: (err) => console.log(err),
  });

  // useQuery(GET_AUTH, {
  //   onCompleted: (data) => setUser(data.me),
  //   onError: (err) => {
  //     console.log(err);
  //     setUser(null);
  //   },
  //   variables: { token },
  // });

  useEffect(() => {
    if (!user) {
      const getUser = async () => {
        try {
          const { data } = await axios.get(`${HTTP_URI}/api/auth/me`, {
            headers: {
              authorization: token || "",
            },
          });

          setUser(data);
        } catch (error) {
          cookie.remove(TOKEN_NAME);

          console.log(error);
        }
      };

      getUser();
    } else {
      console.log("There is user");
    }
  }, [user]);

  return <Routes isAuth={Boolean(user || token)} />;
}

export default App;
