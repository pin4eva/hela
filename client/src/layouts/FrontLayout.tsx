import React, { Fragment } from "react";
import FrontFooter from "components/FrontFooter";
const FrontLayout = ({ children }) => {
  return (
    <Fragment>
      <div id="front-layout">
        <div className="main-page">{children}</div>
        <footer>
          <FrontFooter />
        </footer>
      </div>
    </Fragment>
  );
};

export default FrontLayout;
