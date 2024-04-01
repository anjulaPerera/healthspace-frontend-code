import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { Redirect } from "react-router-dom";
import { RequestState } from "../../RequestState";
import UserContext from "../../context/UserContext";
import { User } from "../../models/User";
import { AuthService } from "../../services/AuthService";
import { RouteName } from "../../RouteName";
import "../vendors/styles/core.css";
import "../vendors/styles/style.css";
import "../vendors/styles/icon-font.css";
import logo from "../../components/vendors/images/logo.svg";
import { AdminService } from "../../services/AdminService";

const Auth: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [userRequestState, setUserRequestState] = useState<RequestState>(
    RequestState.INITIAL
  );

  let history = useHistory();
  if (!token) {
    const token = AuthService.getToken();
    console.log("token find or not", token);
    if (token) {
      setToken(token);
    } else {
      console.log("no token found");
      sessionStorage.clear();
      window.location.href = "/login";
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (token && !user && userRequestState === RequestState.INITIAL) {
      setUserRequestState(RequestState.LOADING);
      AuthService.getMe()
        .then((res) => {
          console.log("line check 1");

          if (res.success) {
            setUser(res.data);
            console.log("line check 2");
            res.data?.userType === "SUPER_ADMIN"
              ? history.push(`/admin/user-management`)
              : history.push(`/hs/home`);
            if (res.data?.userStatus === "ACTIVE") {
              setUserRequestState(RequestState.SUCCESS);
            }
          } else {
            setUserRequestState(RequestState.FAILED);
          }
        })
        .catch(() => {
          setUserRequestState(RequestState.FAILED);
        });
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  switch (userRequestState) {
    case RequestState.FAILED:
      logout();
      return <br />;
    case RequestState.SUCCESS:
      return (
        <div>
          <UserContext.Provider value={[user, setUser]}>
            {children}
          </UserContext.Provider>
        </div>
      );
    default:
      return (
        <div className="pre-loader">
          <div className="pre-loader-box">
            <div className="loader-logo">
              <img src={logo} alt="circView360-logo" />
            </div>
            <div className="loader-progress" id="progress_div">
              <div className="bar" id="bar1"></div>
            </div>
            <div className="percent" id="percent1">
              0%
            </div>
            <div className="loading-text">Loading...</div>
          </div>
        </div>
      );
  }
};

export default Auth;
