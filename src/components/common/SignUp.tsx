import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { PublicService } from "../../services/PublicService";
import { RouteName } from "../../RouteName";
import "../vendors/styles/healthSpaceStyles.css";
import loginImageLeft from "../../components/vendors/images/loginImageLeft.svg";
import loginImageRight from "../../components/vendors/images/loginImageRight.svg";
import loginCardImage from "../../components/vendors/images/loginCardImage.svg";
import userIconLogin from "../../components/vendors/images/userIconLogin.svg";
import emailIconLogin from "../../components/vendors/images/emailIconLogin.svg";
import globeIcon from "../../components/vendors/images/globe-solid.svg";
import userLoginPasswordIcon from "../../components/vendors/images/userLoginPasswordIcon.svg";
import swal from "sweetalert";
import Logo from "../vendors/images/icon/logo2.png";
import { FormFeedback, Form, Input } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp: React.FC = () => {
  const history = useHistory();
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpAttempts, setOtpAttempts] = useState(3);

  useEffect(() => {
    function getCookie(name: any) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          const index = cookie.indexOf("=");
          if (cookie.substring(0, index) === name) {
            cookieValue = cookie.substring(index + 1);
            break;
          }
        }
      }
      return cookieValue;
    }
    const selectedPackage = getCookie("selectedPackage");
    console.log("selectedPackage inside signup=>", selectedPackage);
  });

  const handleSignUp = async (data: any) => {
    if (data) {
      try {
        const response = await PublicService.signUp(data);

        if (response.success) {
          setIsOtpRequired(true);
        } else {
          swal({
            title: "Error",
            text: response.error,
            icon: "error",
          });
          console.log("error======", response.error);
        }
      } catch (error) {
        swal({
          title: "Error",
          text: "An error occurred. Please try again later.",
          icon: "error",
        });
        console.log("error++++++", error);
      }
    }
  };

  const handleOtpVerification = async (otpInput: any) => {
    console.log("otp email", validationStepOtp.values.email);
    try {
      const response = await PublicService.verifyOtp({
        email: validationStepOtp.values.email,
        otpInput,
      });

      console.log("response", response);
      if (response.success) {
        history.push(RouteName.LOGIN);
      } else {
        swal({
          title: "Error",
          text: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.log("catch", error);
    }
  };

  const validationStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      name: "",

      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email Invalid").required("Please Enter Email"),
      name: Yup.string().required("Please Enter Name"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(40)
        .required("Please Enter  Password"),
      confirmPassword: Yup.string()
        .min(6, "Confirm password must be at least 6 characters")
        .max(40)
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please Re-enter Your Password"),
    }),
    onSubmit: (values, { resetForm }) => {
      const userData = {
        name: values.name,
        email: values.email,

        password: values.password,
      };

      handleSignUp(userData);
      resetForm();
    },
  });
  const validationStepOtp = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Please Enter OTP"),
      email: Yup.string().email("Email Invalid").required("Please Enter Email"),
    }),
    onSubmit: (values, { resetForm }) => {
      const otpdata = {
        email: values.email,
        otp: values.otp,
      };

      handleOtpVerification(otpdata);
      resetForm();
    },
  });

  const handleOkayClick = () => {
    history.push("/login");
  };
  return (
    <>
      <div className="login-page">
        <div className="left-bg">
          <img src={loginImageLeft} alt="Left Background" />
        </div>
        <div className="right-bg">
          <img src={loginImageRight} alt="Right Background" />
        </div>

        <div className="container">
          <div className="login-body d-lg-flex text-center ">
            <div className="box-1 mt-md-0 ">
              <div className="mt-5 d-flex justify-content-center">
                <div className="login-form ">
                  <div className="">
                    <NavLink to={"/login"}>
                      <img
                        src={Logo}
                        className="main-logo"
                        alt="cricView360_logo"
                      />
                    </NavLink>
                  </div>
                  {isOtpRequired ? (
                    <Form className="form-horizontal">
                      <p className="mb-1 h-1 text-center login-header">
                        Verify Email
                      </p>

                      <div className="textbox2 mb-3 mt-5">
                        <p className="verify-text">
                          You will receive an Email with a link for verification
                        </p>
                      </div>

                      <div className="d-lg-flex justify-content-center mt-4 mb-5">
                        <button
                          className="login-btn"
                          type="submit"
                          onClick={handleOkayClick}
                        >
                          Okay
                          <span className="fas fa-chevron-right ml-1"></span>
                        </button>
                      </div>
                    </Form>
                  ) : (
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();

                        validationStep.handleSubmit();

                        return false;
                      }}
                    >
                      <p className="mb-1 h-1 text-center login-header">
                        Sign Up
                      </p>

                      <div className="textbox2 mb-3 mt-5">
                        <img
                          src={userIconLogin}
                          alt="Input Icon"
                          className="input-icon"
                        />
                        <Input
                          name="name"
                          className="signUpInput"
                          type="text"
                          placeholder="Enter your name"
                          value={validationStep.values.name}
                          onChange={validationStep.handleChange}
                          onBlur={validationStep.handleBlur}
                          invalid={
                            validationStep.touched.name &&
                            validationStep.errors.name
                              ? true
                              : false
                          }
                        />
                        {validationStep.touched.name &&
                        validationStep.errors.name ? (
                          <FormFeedback
                            type="invalid"
                            style={{ border: "none" }}
                          >
                            {validationStep.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="textbox2 mb-3">
                        <img
                          src={emailIconLogin}
                          alt="Input Icon"
                          className="input-icon"
                        />
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          type="email"
                          value={validationStep.values.email}
                          onChange={validationStep.handleChange}
                          onBlur={validationStep.handleBlur}
                          invalid={
                            validationStep.touched.email &&
                            validationStep.errors.email
                              ? true
                              : false
                          }
                        />
                        {validationStep.touched.email &&
                        validationStep.errors.email ? (
                          <FormFeedback type="invalid">
                            {validationStep.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="textbox2 mb-3">
                        <img
                          src={userLoginPasswordIcon}
                          alt="Input Icon"
                          className="input-icon"
                        />
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter a password"
                          value={validationStep.values.password}
                          onChange={validationStep.handleChange}
                          onBlur={validationStep.handleBlur}
                          invalid={
                            validationStep.touched.password &&
                            validationStep.errors.password
                              ? true
                              : false
                          }
                        />
                        {validationStep.touched.password &&
                        validationStep.errors.password ? (
                          <FormFeedback type="invalid">
                            {validationStep.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="textbox2 mb-3">
                        <img
                          src={userLoginPasswordIcon}
                          alt="Input Icon"
                          className="input-icon"
                        />
                        <Input
                          name="confirmPassword"
                          type="password"
                          placeholder="Re-enter your password"
                          onChange={validationStep.handleChange}
                          onBlur={validationStep.handleBlur}
                          value={validationStep.values.confirmPassword}
                          invalid={
                            validationStep.touched.confirmPassword &&
                            validationStep.errors.confirmPassword
                              ? true
                              : false
                          }
                        />
                        {validationStep.touched.confirmPassword &&
                        validationStep.errors.confirmPassword ? (
                          <FormFeedback type="invalid">
                            {validationStep.errors.confirmPassword}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="d-lg-flex justify-content-center mt-4 mb-5">
                        <button className="login-btn" type="submit">
                          Sign Up
                          <span className="fas fa-chevron-right ml-1"></span>
                        </button>
                      </div>
                      <div className="d-flex justify-content-center mt-3">
                        <span className="login-end-text mt-1">
                          Already have an account ?
                        </span>
                        <NavLink to={"/login"}>
                          <span className="ml-3 signup-btn mt-3 cursor-p">
                            SignIn now
                          </span>
                        </NavLink>
                      </div>
                    </Form>
                  )}
                </div>
              </div>
            </div>
            <div className=" box-2 d-flex flex-column">
              <img src={loginCardImage} alt="Right Background" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
