import PropTypes from "prop-types";
import React, { Fragment } from "react";

const HomePage = () => {
  return (
    <Fragment>
      <p>Home</p>
    </Fragment>
  );
};

HomePage.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
};

export default HomePage;
