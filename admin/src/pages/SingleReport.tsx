import { useQuery } from "@apollo/client";
import { GET_REPORT_QUERY } from "apollo/queries/reportQuery";
import { IReport } from "helpers/types/Report.type";
import React, { useState } from "react";
import Markdown from "react-markdown/with-html";
import { useParams } from "react-router";
import { Loader } from "rsuite";
import styles from "./md.module.scss";

const SingleReport = () => {
  const { slug } = useParams<any>();
  const [report, setReport] = useState<IReport>();

  const { data } = useQuery(GET_REPORT_QUERY, {
    variables: { slug },
    onCompleted: () => setReport(data?.getReport),
    onError: (err) => console.log(err),
  });

  if (!report) return <Loader content="Getting report..." />;

  return (
    <div className="container text-justify">
      <h4 className="text-center text-uppercase">{report.court}</h4>
      <div className={styles.markdown}>
        <Markdown source={report.body} allowDangerousHtml />
      </div>
    </div>
  );
};

export default SingleReport;
