import React, { useState } from "react";
import styled from "styled-components";
import SearchReportComp from "./SearchReport";

const UserReportComp = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <Wrapper className="dashboard-reports">
      <div className="recently-viewed">
        <h5 className="my-3 heading">Recently viewed</h5>
        <div className="grid-2">
          <p className="grid-item">OGUNSANYA OLUWASEYI V THE STATE</p>
          <p className="grid-item">OGUNSANYA OLUWASEYI V THE STATE</p>
          <p className="grid-item">OGUNSANYA OLUWASEYI V THE STATE</p>
          <p className="grid-item">OGUNSANYA OLUWASEYI V THE STATE</p>
        </div>
      </div>

      <h5 className="heading my-4">Supreme court Reports</h5>
      <SearchReportComp getResults={(data) => console.log(data)} />

      <div className="report-tab">
        <ul className="nav nav-tabs  ">
          {tabMenus.map((menu) => (
            <li
              className="nav-item report-tab-item"
              key={menu.id}
              onClick={() => setTabIndex(menu.id)}
            >
              <a
                className={`nav-link c-hand report-tab-item ${
                  tabIndex === menu.id ? "active" : ""
                }`}
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
        <hr className="m-0" />

        <div className="reports-list">
          {reports.map((report, i) => (
            <div className="report-item my-3" key={i}>
              <p className="font-weight-bold">{report.title}</p>
              <div> {report.desc} </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

UserReportComp.propTypes = {};

export default UserReportComp;

const Wrapper = styled.div``;

const tabMenus = [
  { id: 1, name: "All Reports" },
  { id: 2, name: "Supreme court" },
  { id: 3, name: "Court of Apeal" },
];

const reports = [
  {
    title: "OGUNSANYA OLUWASEYI V THE STATE",
    desc:
      "Adipiscing luctus potenti nunc etiam mauris in mollis tristique. Nibh integer iaculis vehicula interdum tristique lectus magna. Sodales malesuada vel est metus. Faucibus pretium pulvinar.",
  },
  {
    title: "OGUNSANYA OLUWASEYI V THE STATE 2",
    desc:
      "Adipiscing luctus potenti nunc etiam mauris in mollis tristique. Nibh integer iaculis vehicula interdum tristique lectus magna. Sodales malesuada vel est metus. Faucibus pretium pulvinar.",
  },
  {
    title: "OGUNSANYA OLUWASEYI V THE STATE 3",
    desc:
      "Adipiscing luctus potenti nunc etiam mauris in mollis tristique. Nibh integer iaculis vehicula interdum tristique lectus magna. Sodales malesuada vel est metus. Faucibus pretium pulvinar.",
  },
  {
    title: "OGUNSANYA OLUWASEYI V THE STATE 3",
    desc:
      "Adipiscing luctus potenti nunc etiam mauris in mollis tristique. Nibh integer iaculis vehicula interdum tristique lectus magna. Sodales malesuada vel est metus. Faucibus pretium pulvinar.",
  },
  {
    title: "OGUNSANYA OLUWASEYI V THE STATE 3",
    desc:
      "Adipiscing luctus potenti nunc etiam mauris in mollis tristique. Nibh integer iaculis vehicula interdum tristique lectus magna. Sodales malesuada vel est metus. Faucibus pretium pulvinar.",
  },
  {
    title: "OGUNSANYA OLUWASEYI V THE STATE 3",
    desc:
      "Adipiscing luctus potenti nunc etiam mauris in mollis tristique. Nibh integer iaculis vehicula interdum tristique lectus magna. Sodales malesuada vel est metus. Faucibus pretium pulvinar.",
  },
  {
    title: "OGUNSANYA OLUWASEYI V THE STATE 3",
    desc:
      "Adipiscing luctus potenti nunc etiam mauris in mollis tristique. Nibh integer iaculis vehicula interdum tristique lectus magna. Sodales malesuada vel est metus. Faucibus pretium pulvinar.",
  },
  {
    title: "OGUNSANYA OLUWASEYI V THE STATE 3",
    desc:
      "Adipiscing luctus potenti nunc etiam mauris in mollis tristique. Nibh integer iaculis vehicula interdum tristique lectus magna. Sodales malesuada vel est metus. Faucibus pretium pulvinar.",
  },
];
