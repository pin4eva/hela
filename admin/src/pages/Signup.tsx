import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "apollo/queries/userQuery";
import { GraphQLError } from "graphql";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignupComp = ({ onSwitch }: { onSwitch(): void }) => {
  const [radio, setRadio] = useState(false);
  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  const [info, setInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    accountType: "",
  });

  const usernameRef = useRef(null);

  // console.log(usernameRef.current.value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password2, ...rest } = info;
    if (info.password !== password2) return alert("Passwords do not match");

    try {
      const { data } = await signup({
        variables: {
          input: {
            ...rest,
            username: info.username.trim(),
          },
        },
      });
      console.log(data);
    } catch (err: any) {
      if (err?.graphQLErrors) {
        err.graphQLErrors.map((er: GraphQLError) => {
          return alert(er.message);
        });
      }
    }
    // console.log(info);
  };
  return (
    <Wrapper className="container">
      <div className="login signup">
        <div className="login-left">
          <div className="container">
            <div className="login-left-wrapper">
              <h4 className="text-center">HELA</h4>

              <div className="social-button ">
                <button className="s-btn">
                  <div className="social-button-icon google">
                    <i className="fab fa-google fa-2x"></i>
                  </div>
                  <div className="social-button-text google">
                    Sign up with Google
                  </div>
                </button>
              </div>
              <div className="social-button  mt-1 mb-5">
                <button className="s-btn">
                  <div className="social-button-icon facebook">
                    <i className="fab fa-facebook-f fa-2x "></i>
                  </div>
                  <div className="social-button-text facebook">
                    Sign up with Facebbok
                  </div>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                    name="name"
                    value={info.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    name="username"
                    value={info.username}
                    onChange={handleChange}
                    required
                    minLength={4}
                    maxLength={16}
                    ref={usernameRef}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    value={info.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    value={info.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    name="password2"
                    value={info.password2}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    name="accountType"
                    className="form-control"
                    value={info.accountType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Account Type</option>
                    <option>Lawyer</option>
                    <option>Student</option>
                    <option>Regular</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    checked={radio}
                    onChange={() => setRadio(!radio)}
                    required
                    name=""
                    className="mr-3"
                  />

                  <label>I Agree to the terms and conditions</label>
                </div>

                <div className="text-center mt-5 mb-5">
                  <button
                    disabled={loading}
                    className="rounded-0 btn-block btn btn-primary"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <p className="text-center">
                Already registered?{" "}
                <Link to="/" className="c-hand hover-primary text-bold ">
                  Login
                </Link>
              </p>
              <Link to="/" className="text-center">
                <i className="fas fa-home "></i>{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="login-right">
          <div className="login-right-wrapper">
            <h4
              className="fs-2 mb-4 text-bold text-lead "
              style={{ lineHeight: "2rem" }}
            >
              Reports at the palm of your hands
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
              congue purus eros hendrerit condimentum amet sed ut et. Nulla
              habitant.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

SignupComp.propTypes = {
  onSwitch: PropTypes.func,
};

const Wrapper = styled.div``;

export default SignupComp;
