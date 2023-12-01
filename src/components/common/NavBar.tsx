import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import "../vendors/styles/core.css";
import "../vendors/styles/style.css";
import { MenuContext } from "../../context/MenuContext";
import "../vendors/styles/healthSpaceStyles.css";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { AdminService } from "../../services/AdminService";
import { Role } from "../../models/Role";
import UserImg from "../vendors/images/icon/User.png";
import UserImg1 from "../vendors/images/icon/userIcon.png";
// import Certificate from "../vendors/images/icon/Certificate.png";
// import Certificate1 from "../vendors/images/icon/packageIcon.png";
import { User } from "../../models/User";
import logo_png from "../../components/vendors/images/logo-png.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDown,
  faAngleRight,
  faArrowDown,
  faHeart,
  faHouse,
  faMessage,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Dp from "../vendors/images/photo4.jpg";
import { environment } from "../../environment/environment";

const NavBar: React.FC = () => {
  const [user, setUser] = useContext(UserContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useContext(MenuContext);
  const [reload, setReload] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    AdminService.getUserById(user?._id).then((res) => {
      console.log("res", res.data);
      const userData: User = res.data;

      if (userData?.profilePicture) {
        const baseUrl = environment.api_url;
        const absoluteUrl = `${baseUrl}/${userData.profilePicture}`;
        console.log("Absolute URL:", absoluteUrl);
        userData.profilePicture = absoluteUrl;
      }

      if (userData?.coverImage) {
        const baseUrl = environment.api_url;
        const absoluteUrl = `${baseUrl}/${userData.coverImage}`;
        console.log("Absolute URL:", absoluteUrl);
        userData.coverImage = absoluteUrl;
      }

      setUser(userData);
      setReload(false);
    });
  }, [reload]);

  const handleProfileClick = () => {
    history.push(`/hs/profile/${user?._id}`);
  };
  return (
    <div className="header">
      <div className="header-left">
        <div
          className="menu-icon ti ti-menu-alt mr-2"
          onClick={toggleMenu}
        ></div>
      </div>
      {user?.userType === Role.SUPER_ADMIN ? null : (
        <div className="header-right d-flex justify-content-between align-items-center flex-wrap pad-right-nav pad-left-nav">
          <div className="d-flex justify-content-start align-items-center header-container-left">
            <NavLink to="/hs/home">
              <div className="w-100 h-100">
                <img src={logo_png} alt="logo" className="navbar-logo" />
              </div>
            </NavLink>
          </div>
          <div className="d-flex justify-content-end align-items-end flex-row-reverse">
            <div
              className="d-flex flex-column justify-content-center align-items-center margin-left-nav-items pos-rel myself cursor-pointer"
              onClick={toggleDropdown}
            >
              <img src={user?.profilePicture} alt="" className="nav-dp" />
              <div className="d-flex justify-centent-center align-items-center">
                <span className="user-name fs-nav">{user?.name}</span>{" "}
                <div onClick={handleClick}>
                  {isExpanded ? (
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="ml-1"
                      style={{ color: "#4d4d4da6" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="ml-2"
                      style={{ color: "#4d4d4da6" }}
                    />
                  )}
                  {/* Other content */}
                </div>
              </div>
              <div
                className={`${
                  isDropdownVisible
                    ? "myself-dropdown h-auto d-flex flex-column justify-content-center align-items-start py-2 px-2"
                    : "hidden"
                }`}
              >
                <div
                  className="logout fs-nav d-flex align-items-center cursor-pointer mb-1 grey-when-hovered w-100 pl-2 px-2 py-1"
                  onClick={handleProfileClick}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-1"
                    style={{ color: "#4d4d4da6" }}
                  />
                  <p>Profile</p>{" "}
                </div>
                <div
                  className="logout fs-nav d-flex align-items-center cursor-pointer grey-when-hovered w-100 pl-2 px-2 py-1"
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="mr-1"
                    style={{ color: "#4d4d4da6" }}
                  />{" "}
                  <p>Logout</p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
