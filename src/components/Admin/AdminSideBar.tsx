import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../vendors/styles/core.css";
import "../vendors/styles/style.css";
import "../vendors/styles/icon-font.css";
import { MenuContext } from "../../context/MenuContext";
import Logo from "../../components/vendors/images/icon/logo.png";
import matches from "../../components/vendors/images/matches.svg";
import pointstable from "../../components/vendors/images/pointstable.svg";
import dashboard from "../../components/vendors/images/dashboard.svg";
import userManagement from "../../components/vendors/images/fi_users.svg";
import profile from "../../components/vendors/images/profile_user.svg";
import logOut from "../../components/vendors/images/logOut.svg";
import UserContext from "../../context/UserContext";
import { Role } from "../../models/Role";
import { RouteName } from "../../RouteName";
import TournamentContext from "../../context/TournamentContext";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
const AdminSideBar: React.FC = () => {
  const [user] = useContext(UserContext);
  const [tournament] = useContext(TournamentContext);
  const [isMenuOpen, setIsMenuOpen] = useContext(MenuContext);
  const splittedURL = window.location.pathname.split("/");
  const tournamentId = splittedURL[splittedURL.length - 1];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <div className={isMenuOpen ? "left-side-bar open" : "left-side-bar"}>
      <div className="brand-logo changed">
        <NavLink
          to={
            user?.userType === Role.SUPER_ADMIN
              ? `/admin/user-management`
              : `/hs/home`
          }
        >
          <img src={Logo} className="light-logo" alt="cricView360_logo" />
        </NavLink>

        <div className="close-sidebar" onClick={toggleMenu}>
          <i className="ion-close-round"></i>
        </div>
      </div>
      <div className="menu-block customscroll">
        <div className="sidebar-menu  d-flex justify-content-center align-items-center">
          <ul id="accordion-menu " className="sidebar-menu-container ">
            {user?.userType === Role.SUPER_ADMIN ? (
              <li>
                <NavLink
                  to={"/admin/user-management"}
                  onClick={toggleMenu}
                  className={
                    window.location.pathname === "/admin/user-management"
                      ? "dropdown-toggle selected-side no-arrow"
                      : "dropdown-toggle no-arrow"
                  }
                >
                  <img src={userManagement} alt="" className="micon" />
                  <div className="d-flex flex-column">
                    <span className="mtext mt-1">User Management</span>
                  </div>
                </NavLink>
              </li>
            ) : null}

            <li>
              <div
                onClick={logout}
                className="dropdown-toggle selected-side no-arrow cursor-p"
              >
                <img src={logOut} alt="" className="micon" />
                <span className="mtext mt-1">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
