import { getReport, getReports } from "apollo/actions/reports";
// import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";
import React from "react";
import { Loader } from "rsuite";
import styles from "./md.module.scss";
import Markdown from "react-markdown/with-html";
import { ReportInterface } from "types/Report.type";
import { NextPageContext } from "next";

const SingleReportPage = ({
  single,
}: {
  single: ReportInterface;
}): JSX.Element => {
  if (!single) return <Loader content="Loading..." />;
  return (
    <div className="container text-justify">
      <h4 className="text-center text-uppercase">{single.court}</h4>
      <div className={styles.markdown}>
        <Markdown source={single.body} allowDangerousHtml />
      </div>
    </div>
  );
};

SingleReportPage.propTypes = {
  single: PropTypes.object,
};

export default SingleReportPage;

export const getStaticProps = async ({
  query,
}: NextPageContext): Promise<{
  props: { single: ReportInterface };
  revalidate: number;
}> => {
  const single = await getReport(query.slug);
  //   console.log(single);
  return {
    props: { single },
    revalidate: 20,
  };
};

export const getStaticPaths = async () => {
  const data = await getReports();

  return {
    paths: data?.map((report: ReportInterface) => `/reports/${report.slug}`),
    fallback: false,
  };
};
