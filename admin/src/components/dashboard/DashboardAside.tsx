import { UserAtom } from "atoms/UserAtom";
import { IUser } from "helpers/types/User.type";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
// import image from "images/my-dp.jpg";
import { PRIMARY_COLOR } from "utils/constants";
import { useMutation } from "@apollo/client";
import { UPLOAD_USER_IMAGE } from "apollo/queries/userQuery";
import { useSetRecoilState } from "recoil";
import { CustomError } from "utils/customError";
import { Loader } from "rsuite";

// import { useAwayListener } from "../AwayListner";

const DashboardAside = (): JSX.Element => {
  const user = useRecoilValue<IUser | null>(UserAtom);
  const setUser = useSetRecoilState<any>(UserAtom);
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>();
  const [uploadImage, { loading }] = useMutation(UPLOAD_USER_IMAGE);

  const handleImagePreview = () => {
    let file = fileRef.current?.files;

    const imageLink = URL.createObjectURL(file && file[0]);
    setPreview(imageLink);
    const reader = new FileReader();
    reader.readAsDataURL((file && file[0]) as Blob);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };

  const handleImageUpload = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // return console.log(image);
    try {
      const { data } = await uploadImage({
        variables: { image },
      });
      alert("Success");

      setUser({
        ...user,
        image: data.uploadImage.image,
      });
      setPreview("");
    } catch (error) {
      CustomError(error);
    }
  };

  const ref = useRef(null);

  // useAwayListener(ref, () => {
  //   if (typeof window !== "undefined") {
  //     const sidebar: HTMLDivElement | any = document.querySelector(
  //       ".dashboard-aside"
  //     );
  //     sidebar.classList.remove("open");
  //   }
  // });

  // const logout = () => {
  //   router.push("/login");
  //   setUser(null);
  // };

  return (
    <Aside className="dashboard-aside" ref={ref}>
      <div className="sidebar-wrapper text-light py-3">
        <div className="d-flex container  align-items-center justify-content-between">
          <Link to="/home" className="flex-1 text-center text-inherit c-hand">
            Hela
          </Link>
          <i className="fas fa-cog text-light-green d-md-none"></i>
        </div>
        <div className="profile container">
          <div className="text-center">
            <div className="profile-image d-flex flex-column align-items-center">
              {preview ? (
                <div className="image-cam">
                  <img
                    className="avater-rounded"
                    src={image}
                    alt="profile-pic"
                  />
                  {loading ? (
                    <Loader className="d-inline" />
                  ) : (
                    <i className="fas fa-save" onClick={handleImageUpload}></i>
                  )}
                </div>
              ) : (
                <div className="image-cam">
                  <img
                    className="avater-rounded"
                    src={user?.image}
                    alt="profile-pic"
                  />
                  <i
                    className="fas fa-camera"
                    onClick={() => fileRef?.current?.click()}
                  ></i>
                </div>
              )}
              <div className="d-none">
                <input
                  type="file"
                  ref={fileRef}
                  onChange={handleImagePreview}
                />
              </div>
              <p className="profile-username my-2">{user?.name}</p>
            </div>
          </div>
        </div>

        <div className="links mt-5">
          <ul className="nav flex-column align-content-center">
            {navLinks.map((nav, i) => (
              <li className="nav-item" key={i}>
                <Link to={nav.link} className="nav-link text-inherit">
                  {nav.name}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <span className="nav-link c-hand">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </Aside>
  );
};

DashboardAside.propTypes = {
  isOpen: PropTypes.bool,
  user: PropTypes.object,
};

DashboardAside.defaultProps = {
  isOpen: true,
};

const Aside = styled.aside`
  .links {
    width: 100%;

    .nav {
      width: 100%;
    }
  }
  .profile {
    margin: 3rem 0;
  }
  .image-cam {
    position: relative;
    i {
      position: absolute;
      bottom: -10px;
      left: 70%;
      cursor: pointer;
      transition: color 0.5s ease-in-out;
      &:hover {
        color: ${PRIMARY_COLOR};
      }
    }
  }
`;

export default DashboardAside;

const navLinks = [
  { name: "Dashboard", link: "/home" },
  { name: "Reports", link: "/reports" },

  { name: "Settings", link: "/settings" },
];
