import DashboardLayout from "layouts/DashboardLayout";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

const DashboardHome = (): JSX.Element => {
  return (
    <DashboardLayout title="Dashbaord">
      <Fragment>
        <div className="grid-3">
          <div className="card bg-white text-center">
            <p>Total reports</p>
            <h1 className="text-info display-3">20</h1>
          </div>
          <div className="card bg-white text-center">
            <p>Total reports</p>
            <h1 className="text-info display-3">20</h1>
          </div>
          <div className="card bg-white text-center">
            <p>Total reports</p>
            <h1 className="text-info display-3">20</h1>
          </div>
        </div>
      </Fragment>
    </DashboardLayout>
  );
};

DashboardHome.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
};

export default DashboardHome;
