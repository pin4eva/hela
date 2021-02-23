import { useMutation, useQuery } from "@apollo/client";
import {
  GET_REPORT_QUERY,
  UPDATE_REPORT_MUTATION,
} from "apollo/queries/reportQuery";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { compiler } from "markdown-to-jsx";
import { AnyARecord } from "node:dns";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactMde from "react-mde";
import { Loader, Notification } from "rsuite";
import styled from "styled-components";
import { IReport } from "types/Report.type";
import { APPEAL_COURT, SUPREME_COURT } from "utils/constants";
import { volumes } from "utils/reportUtils";

dayjs.extend(utc);

interface IPage {
  slug: string;
  onUpdate(data: any): void;
  onCancel(): void;
}

const UpdateReportsComp = ({
  slug,
  onUpdate,
  onCancel,
}: IPage): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const { loading } = useQuery(GET_REPORT_QUERY, {
    variables: { slug },
    onCompleted: (data) => {
      const { __typeName, ...rest } = data.getReport;
      setInfo(rest);
    },

    onError: (err) => console.log(err),
  });
  const [updateReport, { loading: updating }] = useMutation(
    UPDATE_REPORT_MUTATION
  );
  const [info, setInfo] = useState<IReport | any>();

  const notify = (funcName: string, title: string, content: string) => {
    Notification[funcName]({
      title: title,
      description: <p>{content}</p>,
    });
  };

  const handleChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      const { data } = await updateReport({
        variables: {
          input: {
            court: info?.court,
            date: info?.date,
            title: info?.title,
            vol: info?.vol,
            summary: info?.summary,
            body: info?.body,
            _id: info?._id,
          },
        },
      });
      notify(
        "success",
        "Success",
        `Successfully add ${data.updateReport.title}`
      );
      onUpdate(data.updateReport);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || !slug) return <Loader />;

  return (
    <Wrapper>
      <div className="card mt-4">
        <h5 className="text-center text-uppercase">Update Report</h5>
        <form>
          <div className="form-group">
            <label>Court</label>
            <select
              className=""
              aria-label="Select Court"
              value={info?.court}
              name="court"
              onChange={handleChange}
            >
              <option value=""></option>
              <option>{SUPREME_COURT}</option>
              <option>{APPEAL_COURT} </option>
            </select>
          </div>
          <div className="form-group">
            <label>Volume</label>
            <select
              className="form-control"
              aria-label="Select Volume"
              name="vol"
              value={info?.vol}
              onChange={handleChange}
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
              value={info?.title}
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="date"
              className="form-conrol"
              value={dayjs(info?.date).format()}
              name="date"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Summary</label>
            <ReactMde
              value={info?.summary}
              onChange={(e) => setInfo({ ...info, summary: e })}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(compiler(markdown))
              }
            />
          </div>

          <div className="form-group">
            <label>Judgement</label>
            <ReactMde
              value={info?.body}
              onChange={(e) => setInfo({ ...info, body: e })}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(compiler(markdown))
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

            <button
              className="btn btn-primary"
              type="button"
              disabled={loading}
              onClick={submit}
            >
              {updating ? <Loader content="processing..." /> : "Update Report"}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

UpdateReportsComp.propTypes = {
  onUpdate: PropTypes.func,
  onCancel: PropTypes.func,
  slug: PropTypes.string,
};

const Wrapper = styled.div``;

export default UpdateReportsComp;
