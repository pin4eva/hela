import { useMutation } from "@apollo/client";
import { DELETE_REPORT_MUTATION } from "apollo/queries/reportQuery";
import { ReportsAtom } from "atoms/ReportsAtom";
import dayjs from "dayjs";
import { IReport } from "helpers/types/Report.type";
import { ObjectId } from "mongoose";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Notification } from "rsuite";
import styled from "styled-components";
import MoreIcon from "../shared/MoreIcon";

interface IPage {
  report: IReport;
  onDelete(s: any): void;
  edit(s: string): void;
}

const ReportItem = ({ report, onDelete, edit }: IPage) => {
  const [deleteReport] = useMutation(DELETE_REPORT_MUTATION);

  const removeReport = async () => {
    const res = window.confirm("Do you want to delete now ?");

    if (!res) return;
    try {
      const { data } = await deleteReport({ variables: { _id: report._id } });
      Notification.success({
        title: "Success",
        description: <p>Successfully deleted {data.deleteReport.title} </p>,
      });
      onDelete(data.deleteReport._id);
      // setReports(reports.filter((rep) => rep.id !== data.deleteReport._id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tr>
      <td className="table-title">
        <Link to={`/reports/${report.slug}`}>{report.title}</Link>
      </td>
      <td>{report?.added_by?.name}</td>
      <td>{dayjs(report.createdAt).format("DD-MM-YYYY")}</td>
      <td>
        <MoreIcon>
          <div onClick={() => edit(report.slug)}>
            <i className="fas fa-pen" style={{ marginRight: "8px" }}></i>
            Edit
          </div>
          <div onClick={removeReport}>
            <i className="fas fa-times text-danger"></i> Delete
          </div>
        </MoreIcon>
      </td>
    </Tr>
  );
};

const Tr = styled.tr``;

ReportItem.propTypes = {
  report: PropTypes.object,
  onDelete: PropTypes.func,
  edit: PropTypes.func,
};

interface ITableReport {
  reports: IReport[];
  onUpdate(s: any): void;
  setReports(s: any): void;
}

const ReportTableComp = ({ reports, onUpdate, setReports }: ITableReport) => {
  const handleDelete = (_id: ObjectId) => {
    setReports(reports.filter((rep: IReport) => rep.id !== _id));
  };
  if (!reports?.length) return <p>Getting reports....</p>;
  return (
    <Wrapper>
      <table className="table table-borderless table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[...reports].map((report: IReport, i: number) => (
            <ReportItem
              key={i}
              report={report}
              edit={onUpdate}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

ReportTableComp.propTypes = {
  reports: PropTypes.array,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default ReportTableComp;
