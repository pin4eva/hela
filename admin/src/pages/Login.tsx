import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "apollo/queries/userQuery";
import { UserAtom } from "atoms/UserAtom";
import { IUser } from "helpers/types/User.type";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Loader } from "rsuite";

const LoginPage = () => {
  const history = useHistory();
  const user = useRecoilValue<IUser | null>(UserAtom);
  const setUser = useSetRecoilState(UserAtom);
  const [info, setInfo] = useState({
    password: "",
    email: "",
  });
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (user) history.push("/home");
  }, [history, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const { data } = await axios.post(
      //   "http://localhost:8000/api/auth/login",
      //   {
      //     email: info.email,
      //     password: info.password,
      //   },
      //   {
      //     withCredentials: true,
      //   }
      // );
      const { data } = await login({
        variables: { email: info.email, password: info.password },
      });
      setUser(data.login.user);

      setUser(data);

      history.push("/home");
    } catch (error) {
      console.log(error);
      if (error) {
        alert(error?.message);
      }
    }
  };
  return (
    <div className="container">
      <div className="login">
        <div className="login-left">
          <div className="container">
            <div className="login-left-wrapper">
              <h4 className="text-center">HELA</h4>

              <div className="social-button my-5">
                <button className="s-btn">
                  <div className="social-button-icon google">
                    <i className="fab fa-google fa-2x"></i>
                  </div>
                  <div className="social-button-text google">
                    Sign in with Google
                  </div>
                </button>
              </div>

              <form onSubmit={submit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    value={info.email}
                    onChange={handleChange}
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
                  />
                </div>

                <div className="text-center  mb-5">
                  <button className="btn btn-primary">
                    {loading ? <Loader content="Processing" /> : "Login"}
                  </button>
                </div>
              </form>

              <p className="text-center">
                Don't have an account yet?{" "}
                <Link to="/register" className="c-hand text-bold ">
                  Sign Up
                </Link>
              </p>
              <Link to="/" className="text-center">
                <i className="fas fa-home "></i>
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
    </div>
  );
};

export default LoginPage;
