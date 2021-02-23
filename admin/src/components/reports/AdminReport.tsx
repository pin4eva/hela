import { gql, useQuery } from "@apollo/client";
// import { GET_REPORTS_QUERY } from "apollo/queries/reportQuery";
import { IReport } from "helpers/types/Report.type";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { PRIMARY_COLOR } from "utils/constants";
import AddReportsComp from "./AddReports";
import ReportTableComp from "./ReportTable";
import UpdateReportsComp from "./UpdateReport";

const GET_REPORTS_QUERY = gql`
  query($search: String, $skip: Int, $limit: Int) {
    getReports(search: $search, skip: $skip, limit: $limit) {
      _id
      court
      title
      date
      vol
      slug
      added_by {
        name
      }
    }
  }
`;

const AdminReportComp = (): JSX.Element => {
  const [view, setView] = useState("main");
  const [reports, setReports] = useState<IReport[]>([]);
  const [slug, setSlug] = useState("");
  const [search, setSearch] = useState("");

  useQuery(GET_REPORTS_QUERY, {
    variables: { search, limit: 10 },
    onCompleted: (data) => setReports(data?.getReports),
    onError: (err) => console.log(err),
  });

  const handleAddReport = (data: any) => {
    setReports([...reports, data]);
  };

  const handleUpdate = (slug: string) => {
    setView("update");
    setSlug(slug);
  };

  return (
    <Wrapper>
      <div className="mt-3">
        <input
          type="search"
          className="form-control rounded-0"
          placeholder="Search for any report..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {view === "main" && (
        <Fragment>
          <div className="reports-table my-4">
            <div className="card">
              <ReportTableComp
                setReports={setReports}
                onUpdate={handleUpdate}
                reports={reports}
              />
            </div>
          </div>

          <div className="report-add-btn">
            <span
              className="btn btn-primary btn-add-rounded p-3 "
              onClick={() => setView("add")}
            >
              <i className="fas fa-plus"></i>
            </span>
          </div>
        </Fragment>
      )}
      {view === "add" && (
        <AddReportsComp
          onAdd={handleAddReport}
          onCancel={() => setView("main")}
        />
      )}
      {view === "update" && (
        <UpdateReportsComp
          slug={slug}
          onUpdate={(data) => {
            setReports(
              reports.map((rep) => (rep._id === data._id ? (rep = data) : rep))
            );
            setView("main");
          }}
          onCancel={() => setView("main")}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  /* .report-table {
  } */
  .report-add-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    /* background-color: ${PRIMARY_COLOR}; */
  }
`;
export default AdminReportComp;
