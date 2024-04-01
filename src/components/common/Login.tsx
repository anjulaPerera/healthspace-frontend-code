import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { RequestState } from "../../RequestState";
import swal from "sweetalert";
import { RouteName } from "../../RouteName";
import "../vendors/styles/healthSpaceStyles.css";
import loginImageLeft from "../../components/vendors/images/loginImageLeft.svg";
import loginImageRight from "../../components/vendors/images/loginImageRight.jpg";
import loginCardImage from "../../components/vendors/images/loginCardImage.svg";
import userIconLogin from "../../components/vendors/images/userIconLogin.svg";
import emailIconLogin from "../../components/vendors/images/emailIconLogin.svg";
import userLoginPasswordIcon from "../../components/vendors/images/userLoginPasswordIcon.svg";
import { LoginData } from "../../models/LoginModel";
import RightArrow from "../vendors/images/icon/right-arrow.png";
import CustomModal from "./Modal";
import { PublicService } from "../../services/PublicService";
import Logo from "../vendors/images/logo-text.png";
import { AdminService } from "../../services/AdminService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import rightBg from "../../components/vendors/images/right-bg.jpg";

const Login: React.FC = () => {
  const token = AuthService.getToken();
  const history = useHistory();
  let loginData: LoginData = {
    email: "",
    password: "",
    loginMethod: "",
    remember: "",
  };

  const [remember, setRemember] = useState(false);
  const [userData, setUserData] = useState(loginData);
  const [error, setError] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialState = {
    email: "",
    name: "",
    message: "",
  };
  const [demoEmail, setDemoEmail] = useState<any>(initialState);
  const [loginRequestState, setLoginRequestState] = useState<RequestState>(
    RequestState.INITIAL
  );

  useEffect(() => {
    if (loginRequestState === RequestState.LOADING) {
      AuthService.userLogin(userData)
        .then(async (res) => {
          if (res.success) {
            AuthService.setToken(res.data.token);
            setLoginRequestState(RequestState.SUCCESS);
          } else {
            setError(res.error);
            setLoginRequestState(RequestState.FAILED);
          }
        })
        .catch((e) => {
          setError(e);
          setLoginRequestState(RequestState.FAILED);
        });
    } else if (loginRequestState === RequestState.FAILED) {
      swal({ title: "User login fail!", icon: "error" });
    }
    // else if (loginRequestState === RequestState.SUCCESS) {
    //   if (token || loginRequestState === RequestState.SUCCESS) {
    //     verifyUser();
    //   }
    // }
  }, [loginRequestState]);

  const handleChange = (event: any) => {
    // console.log(event.target.checked);
  };

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserData({
      email: (
        event.currentTarget.elements.namedItem("email") as HTMLInputElement
      ).value,
      password: (
        event.currentTarget.elements.namedItem("password") as HTMLInputElement
      ).value,
      loginMethod: "EMAIL",
      remember: remember ? "TRUE" : "FALSE",
    });
    setLoginRequestState(RequestState.LOADING);
  };

  const verifyUser = async () => {
    try {
      const res = await AuthService.getMe();
      if (res.success) {
        const { userType, userStatus, isVerified, _id } = res.data;
        console.log("userType", userType);
        if (userStatus === "ACTIVE") {
          switch (userType) {
            case "SUPER_ADMIN":
              history.push(RouteName.ADMIN_USER_MANAGEMENT);
              break;
            case "RECEIVER":
            case "DONOR":
              history.push(RouteName.ADMIN_MAIN_DASHBOARD);
              break;
            default:
              break;
          }
        } else {
          if (!isVerified) {
            sessionStorage.clear();
            swal({ icon: "error", title: "User not verified yet!" });
          }
        }
      } else {
        sessionStorage.clear();
        swal({ icon: "error", title: "User not verified yet!" });
      }
    } catch (error) {
      console.error("Error while verifying user:", error);
    }
  };

  if (token || loginRequestState === RequestState.SUCCESS) {
    verifyUser();
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="login-page">
        <div className="all-bg">
          <img src={loginImageRight} alt="Right Background" />
        </div>

        <div className="container">
          <div className="login-body d-lg-flex text-center ">
            <div className="box-1 mt-md-0 ">
              <div className="mt-5 d-flex justify-content-center">
                <div className="login-form ">
                  <div className="mb-4">
                    <NavLink to={"/login"}>
                      <img
                        src={Logo}
                        className="main-logo w-100"
                        alt="healthspace_logo"
                      />
                    </NavLink>
                  </div>
                  <form onSubmit={submitLogin}>
                    <p className="mb-1 h-1 text-center login-header">Login</p>

                    <div className="textbox mt-5">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="input-icon"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                      />
                    </div>
                    <div className="textbox mt-3">
                      <FontAwesomeIcon icon={faKey} className="input-icon" />
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                      />
                    </div>
                    <div className="d-lg-flex justify-content-between mt-4 mb-3">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          id="lightBlueCheckbox"
                          className="custom-checkbox"
                          onChange={handleChange}
                        />
                        {/* <span className="custom-checkbox-icon"></span>
                        Remember me */}
                      </label>
                      {/* <p className="checkbox-label-para cursor-p">
                        Forgot your password?
                      </p> */}
                    </div>
                    <div className="d-lg-flex justify-content-center mt-4 mb-5">
                      <button className="login-btn" type="submit">
                        Login
                        <span className="fas fa-chevron-right ml-1 login-span text-white"></span>
                      </button>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                      <span className="login-end-text mt-1">
                        Do you want to try out ?
                      </span>
                      {/* <span
                        className="ml-3 signup-btn mt-2 cursor-p"
                        onClick={() => handleOpenModal()}
                      >
                        Contact us
                      </span> */}
                      <NavLink to={"/signup"}>
                        <span className="ml-3 signup-btn mt-2 cursor-p">
                          SignUp now
                        </span>
                      </NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className=" box-2 d-flex flex-column h-100">
              <img src={rightBg} alt="Right Background" />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
