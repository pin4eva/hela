import AdminReportComp from "components/reports/AdminReport";
import DashboardLayout from "layouts/DashboardLayout";
import { UserAtom } from "atoms/UserAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const ReportsPage = (): JSX.Element => {
  const user = useRecoilValue(UserAtom);

  // if (!user) return <p>Loading....</p>;
  return (
    <DashboardLayout title="Reports">
      <Wrapper className="dashboard-reports">
        <AdminReportComp />
      </Wrapper>
    </DashboardLayout>
  );
};

export default ReportsPage;

const Wrapper = styled.div``;
