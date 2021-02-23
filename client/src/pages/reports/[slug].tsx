import { gql } from "@apollo/client";
import { initializeApollo } from "apollo";
import { GET_REPORT_QUERY } from "apollo/queries/reportQuery";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { Fragment } from "react";
import Markdown from "react-markdown/with-html";
import { Loader } from "rsuite";
import styled from "styled-components";
import { IReport } from "types/Report.type";
import styles from "./md.module.scss";
import Head from "next/head";

const GET_REPORTS = gql`
  query($search: String, $limit: Int, $skip: Int) {
    getReports(search: $search, limit: $limit, skip: $skip) {
      _id
      title
      slug
      caseRef
      court
      summary
    }
  }
`;

const SingleReportPage: NextPage<{ single: IReport }> = ({
  single,
}: {
  single: IReport;
}): JSX.Element => {
  if (!single) return <Loader content="Loading..." />;
  return (
    <Fragment>
      <Head>
        <title>{single?.title}</title>
        <meta name="description" content={single?.summary.slice(0, 400)} />
      </Head>
      <Wrapper>
        <div className="container text-justify single-report">
          <h4 className="text-center text-uppercase">{single.court}</h4>
          <h6 className="text-center">{single?.title}</h6>
          <p className="text-right my-2 date">
            {dayjs(single?.date).format("MMMM DD YYYY")}
          </p>
          <div className={styles.markdown}>
            <Markdown source={single.body} allowDangerousHtml />
          </div>
        </div>
      </Wrapper>
    </Fragment>
  );
};

export default SingleReportPage;

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{ props: { single: IReport }; revalidate: number }> => {
  const apollo = initializeApollo();
  const { data } = await apollo.query({
    variables: { slug: params?.slug },
    query: GET_REPORT_QUERY,
  });
  const single: IReport = data?.getReport;
  //   console.log(single);
  return {
    props: { single },
    revalidate: 20,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query({
    query: GET_REPORTS,
    // variables: { limit: 10 },
  });
  const reports: IReport[] = data?.getReports;
  return {
    paths: reports?.map((report: IReport) => `/reports/${report.slug}`),
    fallback: false,
  };
};

const Wrapper = styled.div`
  .date {
    /* font-weight: 200; */
    font-style: italic;
  }
`;
