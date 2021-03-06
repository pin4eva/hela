import { ReportsAtom } from "atoms/ReportsAtom";
import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AddReportsComp from "./AddReports";
import ReportTableComp from "./ReportTable";
import UpdateReportsComp from "./UpdateReport";

const AdminReportComp = (): JSX.Element => {
  const [view, setView] = useState("main");
  const [reports, setReports] = useRecoilState<any[]>(ReportsAtom);
  const [slug, setSlug] = useState("");

  const handleAddReport = (data: any) => {
    setReports([...reports, data]);
  };

  const handleUpdate = (slug: string) => {
    setView("update");
    setSlug(slug);
  };

  return (
    <Wrapper>
      <div className="card-wrapper">
        <div className="grid grid-2">
          <div className="card bg-white text-center">
            <p>Total reports</p>
            <h1 className="text-info display-3">20</h1>
          </div>
          <div className="card bg-white text-center">
            <p>Total reports</p>
            <h1 className="text-info display-3">20</h1>
          </div>
        </div>
      </div>

      {view === "main" && (
        <Fragment>
          <div className="reports-table my-4">
            <div className="card">
              <ReportTableComp onUpdate={handleUpdate} reports={reports} />
            </div>
          </div>

          <div className="report-add-btn">
            <a
              className="wrapper btn btn-primary btn-add-rounded p-3 "
              onClick={() => setView("add")}
            >
              <i className="fas fa-plus"></i>
            </a>
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
  }
`;
export default AdminReportComp;
