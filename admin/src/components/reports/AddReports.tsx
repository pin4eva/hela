import { useMutation } from "@apollo/client";
import { ADD_REPORT_MUTATION } from "apollo/queries/reportQuery";
import { ReportsAtom } from "atoms/ReportsAtom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IReport } from "helpers/types/Report.type";
import { compiler } from "markdown-to-jsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactMde from "react-mde";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Loader, Notification } from "rsuite";
import styled from "styled-components";
import { APPEAL_COURT, SUPREME_COURT } from "utils/constants";
import { volumes } from "utils/reportUtils";

dayjs.extend(utc);

interface IPage {
  onAdd(data: any): void;
  onCancel(): void;
}

const AddReportsComp = ({ onAdd, onCancel }: IPage): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const reports = useRecoilValue<IReport[]>(ReportsAtom);
  const setReports = useSetRecoilState<any>(ReportsAtom);
  const [addReport, { loading }] = useMutation(ADD_REPORT_MUTATION);
  const [info, setInfo] = useState({
    title: "",
    date: "",
    court: "",
    summary: "",
    body: "",
    vol: "",
  });

  const notify = (
    funcName: string,
    title: string,
    content: {} | null | undefined
  ) => {
    Notification[funcName]({
      title: title,
      description: <p>{content}</p>,
    });
  };

  // console.log(dayjs(info.date).format("dd-MM-YYYY"));
  const submit = async () => {
    const { court, date, title } = info;

    if (!court) return notify("error", "Error", "Please select court");
    if (!title)
      return notify(
        "error",
        "Error",
        "Please add a title, (eg Apeallent V. Respondent)"
      );
    if (!date)
      return notify("error", "Error", "Please make sure you choose a date");

    const reportData = {
      ...info,
      date: dayjs(info.date),
    };

    try {
      const { data } = await addReport({ variables: { input: reportData } });
      notify("success", "Success", `Successfully add ${data.addReport.title}`);
      setReports([...reports, data.addReport]);
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="card mt-4 container py-3">
        <h5 className="text-center text-uppercase font-weight-bold">
          New Report
        </h5>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Court</label>
            <select
              className="form-select"
              aria-label="Select Court"
              value={info.court}
              onChange={(e) => setInfo({ ...info, court: e.target.value })}
            >
              <option value=""></option>
              <option>{SUPREME_COURT}</option>
              <option>{APPEAL_COURT} </option>
            </select>
          </div>
          <div className="form-group">
            <label>Volume</label>
            <select
              className="form-select"
              aria-label="Select Volume"
              value={info.vol}
              onChange={(e) => setInfo({ ...info, vol: e.target.value })}
            >
              <option value=""></option>
              {volumes.map((vol, i) => (
                <option key={i}>{vol}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-conrol"
              value={info.title}
              onChange={(e) => setInfo({ ...info, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="date"
              className="form-conrol"
              value={info.date}
              onChange={(e) => setInfo({ ...info, date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Summary</label>
            <ReactMde
              value={info.summary}
              onChange={(e) => setInfo({ ...info, summary: e })}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={
                (markdown) => Promise.resolve(compiler(markdown))
                // Promise.resolve(converter.makeHtml(markdown))
              }
            />
          </div>

          <div className="form-group">
            <label>Judgement</label>
            <ReactMde
              value={info.body}
              onChange={(e) => setInfo({ ...info, body: e })}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={
                (markdown) => Promise.resolve(compiler(markdown))
                // Promise.resolve(converter.makeHtml(markdown))
              }
            />
          </div>

          <div className=" text-center">
            <button
              className="btn btn-secondary "
              type="button"
              style={{ marginRight: "0.8rem" }}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button className="btn btn-primary">
              {loading ? <Loader content="Processing" /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

AddReportsComp.propTypes = {
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
};

const Wrapper = styled.div``;

export default AddReportsComp;
