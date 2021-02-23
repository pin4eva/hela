import AdminReportComp from "components/reports/AdminReport";
import React from "react";
import styled from "styled-components";

const ReportsPage = () => {
  // const user = useRecoilValue(UserAtom);

  // if (!user) return <p>Loading....</p>;
  return (
    <Wrapper className="dashboard-reports">
      <AdminReportComp />
    </Wrapper>
  );
};

export default ReportsPage;

const Wrapper = styled.div``;
