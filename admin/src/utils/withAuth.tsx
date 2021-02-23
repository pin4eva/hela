import { React } from "@ungap/global-this";
import PropTypes from "prop-types";

const withAuth = (WrappedComponent) => {
  const MyComp = ({ children, ...props }) => {
    console.log(props);
    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };

  MyComp.propTypes = {
    children: PropTypes.node,
  };
};

export default withAuth;
