import { gql, useLazyQuery } from "@apollo/client";
import { initializeApollo } from "apollo";
import HeaderBannerComp from "components/HeaderBanner";
import SearchReportComp from "components/reports/SearchReport";
import FrontLayout from "layouts/FrontLayout";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Loader } from "rsuite";
import styled from "styled-components";
import { IReport } from "types/Report.type";
import { APPEAL_COURT, SUPREME_COURT } from "utils/constants";

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

const ReportsListPage: NextPage<{ allReports: IReport[] | null }> = ({
  allReports,
}: {
  allReports: IReport[];
}): JSX.Element => {
  const [activeTab, setActiveTab] = useState("All");
  // const [count, setCount] = useState(0);
  const [reports, setReports] = useState<IReport[]>([]);
  const [getReports, { loading }] = useLazyQuery(GET_REPORTS, {
    onCompleted: (data) => setReports(data.getReports),
    onError: (err) => console.log(err),
  });

  const handleSwitch = (tab: string) => {
    console.log(tab);
    // setActiveTab(tab);
    // setReports(reports.filter((report) => report.court === tab));
  };

  useEffect(() => {
    if (allReports) {
      setReports(allReports);
    }
  }, []);

  if (!allReports) return <Loader content="Getting Reports" />;
  return (
    <FrontLayout>
      <HeaderBannerComp image="/images/reports-banner.png" />
      <Wrapper>
        <div className="reports">
          <div className="container">
            <SearchReportComp
              loading={loading}
              onSearch={(data) => {
                getReports({ variables: { search: data } });
              }}
            />
            <Fragment>
              <div className="reports-tab mt-4">
                <ul className="nav nav-tabs">
                  {tabList.map((tab, i) => (
                    <li className="nav-item" key={i}>
                      <a
                        className={`nav-link c-hand ${
                          activeTab === tab ? "active" : ""
                        }`}
                        onClick={() => handleSwitch(tab)}
                        // onClick={() => console.log(tab)}
                      >
                        {tab}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reports-map">
                {reports?.map((report, i) => (
                  <ItemView key={i} report={report} />
                ))}
              </div>
            </Fragment>
          </div>
        </div>
      </Wrapper>
    </FrontLayout>
  );
};

const Wrapper = styled.div`
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  .reports {
    &-tab {
      .nav-tabs {
        .nav-link {
          transition: 0.5s all ease-in-out;
          &.active {
            border-bottom: 2px solid red;
          }
        }
      }
    }

    &-map {
      h6 {
        font-size: 1rem;
      }
      /* background-color: red; */
    }
  }
`;

export default ReportsListPage;

const tabList = ["All", SUPREME_COURT, APPEAL_COURT];

ReportsListPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<{ allReports: IReport[] | null }> => {
  const apollo = initializeApollo(null, ctx);
  try {
    const { data } = await apollo.query({
      query: GET_REPORTS,
      variables: { limit: 5 },
    });
    const reports: IReport[] = data?.getReports;

    return {
      allReports: reports,
    };
  } catch (error) {
    console.log(error);
    return {
      allReports: null,
    };
  }
};

const ItemView = ({ report }: { report: IReport }) => {
  return (
    <div className="wrapper my-3 ">
      <div className="wrapper-header">
        <Link href={`/reports/${report.slug}`}>
          <h6 className="mt-3 mb-0 c-hand hover-primary">{report.title}</h6>
        </Link>
        <div className="small font-italic d-flex justify-content-between mb-3">
          <small className="text-uppercase">{report.court}</small>
          <small className="text-uppercase">{report.caseRef}</small>
        </div>
      </div>

      <p className="text-small">{report.summary.slice(0, 300).concat("...")}</p>
    </div>
  );
};
