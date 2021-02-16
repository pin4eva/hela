import Link from "next/link";
import React, { Fragment } from "react";
import Logo from "./Logo";

const FrontFooter = () => {
  return (
    <Fragment>
      <div className="footer-top bg-dark  text-light">
        <div className="container py-3">
          <div className="footer-top-wrapper text-center">
            <Link href="/">
              <a className=" d-flex justify-center my-3">
                <Logo bg="white" width="4rem" />
              </a>
            </Link>
            <h1 className="text-center">Download the app now</h1>
            <p className="my-4">
              Id lobortis nunc facilisi nibh neque, ornare. Sit semper pharetra
              ornare arcu
            </p>
            <button className="btn btn-primary">Get started</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <div className="d-flex align-items-center justify-content-between inner">
          <p className="mb-0">Copyright © Hela 2020</p>
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default FrontFooter;
