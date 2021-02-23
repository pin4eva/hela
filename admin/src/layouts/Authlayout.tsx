import React from "react";

const Authlayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div id="login">{children}</div>;
};

export default Authlayout;
