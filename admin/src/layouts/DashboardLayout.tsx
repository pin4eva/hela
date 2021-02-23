/* eslint-disable react-hooks/exhaustive-deps */
import { ReportCount } from "atoms/ReportsAtom";
import { UserAtom } from "atoms/UserAtom";
import DashboardAside from "components/dashboard/DashboardAside";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
interface IPage {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: IPage): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [user] = useRecoilState(UserAtom);
  const reportsCount = useRecoilValue(ReportCount);

  const handleToggle = () => {
    setOpen(true);
  };

  // useEffect(()=>{})

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (open) {
        const sidebar = document.querySelector(".dashboard-aside");
        sidebar?.classList.toggle("open");
      } else {
        setOpen(false);
      }
    }
    return () => {
      setOpen(false);
    };
  }, [open]);

  return (
    <div className="dashboard">
      <DashboardAside user={user} />
      <main className="dashboard-main">
        <div className="wrapper ">
          <div className="container">
            <div className="d-flex align-items-center py-3">
              <i
                className="fas fa-bars fa-2x text-info d-md-none c-hand"
                onClick={handleToggle}
              ></i>
              <h5 className="text-center flex-1 m-0">{title}</h5>
            </div>
            <div className="grid-2">
              <div className="card bg-white text-center">
                <h6 className="pt-3">Total reports</h6>
                <h1 className="text-info display-3">{reportsCount}</h1>
              </div>
              <div className="card bg-white text-center">
                <p className="pt-3">Total Notes</p>
                <h1 className="text-info display-3">0</h1>
              </div>
            </div>
            <div className="mt-3">{children}</div>
          </div>
        </div>
        <footer className="dashboard-footer">footer</footer>
      </main>
    </div>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
};

export default DashboardLayout;
