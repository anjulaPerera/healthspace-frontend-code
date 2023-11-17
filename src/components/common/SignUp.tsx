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
import { Field, useFormik } from "formik";
import * as Yup from "yup";

const SignUp: React.FC = () => {
  const history = useHistory();
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpAttempts, setOtpAttempts] = useState(3);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSignUp = async (data: any) => {
    console.log("inside handlesignUp : data", data);
    if (data) {
      console.log("data is available: inside if", data);
      try {
        console.log("inside try");
        await PublicService.signUp(data)
          .then((res) => {
            console.log("res:::::", res);
            if (res.success) {
              console.log("inside res.success");
              setIsOtpRequired(true);
            } else {
              swal({
                title: "Error",
                text: res.error,
                icon: "error",
              });
              console.log("error======", res.error);
            }
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: "An error occurred. Please try again later.",
              icon: "error",
            });
            console.log("error++++++", err);
          });
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
      dob: "",
      city: "",
      phone: "",
      userType: "",
      occupation: "",
      profilePicture: "",
      coverImage: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email Invalid").required("Please Enter Email"),
      name: Yup.string().required("Please Enter Name"),
      dob: Yup.date().required("Please Enter Date of Birth"),
      city: Yup.string().required("Please Enter City"),
      phone: Yup.string().required("Please Enter Phone Number"),
      userType: Yup.string().required("Please Select User Type"),
      occupation: Yup.string().required("Please Enter Occupation"),
      profilePicture: Yup.mixed().required("Please Upload Profile Picture"),

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
        dob: values.dob,
        city: values.city,
        phone: values.phone,
        userType: values.userType,
        occupation: values.occupation,
        profilePicture: values.profilePicture,
        coverImage: values.coverImage,
        password: values.password,
      };

      console.log("userData before handleSignUp", userData);

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
                      encType="multipart/form-data"
                    >
                      <p className="mb-1 h-1 text-center login-header">
                        Sign Up
                      </p>

                      {currentStep === 1 && (
                        <>
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
                              src={emailIconLogin}
                              alt="Input Icon"
                              className="input-icon"
                            />
                            <Input
                              id="dob"
                              name="dob"
                              className="form-control"
                              placeholder="Enter your DOB"
                              type="date"
                              value={validationStep.values.dob}
                              onChange={validationStep.handleChange}
                              onBlur={validationStep.handleBlur}
                              invalid={
                                validationStep.touched.dob &&
                                validationStep.errors.dob
                                  ? true
                                  : false
                              }
                            />
                            {validationStep.touched.dob &&
                            validationStep.errors.dob ? (
                              <FormFeedback type="invalid">
                                {validationStep.errors.dob}
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
                              id="city"
                              name="city"
                              className="form-control"
                              placeholder="Enter your city"
                              type="text"
                              value={validationStep.values.city}
                              onChange={validationStep.handleChange}
                              onBlur={validationStep.handleBlur}
                              invalid={
                                validationStep.touched.city &&
                                validationStep.errors.city
                                  ? true
                                  : false
                              }
                            />
                            {validationStep.touched.city &&
                            validationStep.errors.city ? (
                              <FormFeedback type="invalid">
                                {validationStep.errors.city}
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
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div className="textbox2 mb-3 mt-5">
                            <img
                              src={emailIconLogin}
                              alt="Input Icon"
                              className="input-icon"
                            />
                            <Input
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder="Enter your phone number"
                              type="text"
                              value={validationStep.values.phone}
                              onChange={validationStep.handleChange}
                              onBlur={validationStep.handleBlur}
                              invalid={
                                validationStep.touched.phone &&
                                validationStep.errors.phone
                                  ? true
                                  : false
                              }
                            />
                            {validationStep.touched.phone &&
                            validationStep.errors.phone ? (
                              <FormFeedback type="invalid">
                                {validationStep.errors.phone}
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
                              id="occupation"
                              name="occupation"
                              className="form-control"
                              placeholder="Enter your occupation"
                              type="text"
                              value={validationStep.values.occupation}
                              onChange={validationStep.handleChange}
                              onBlur={validationStep.handleBlur}
                              invalid={
                                validationStep.touched.occupation &&
                                validationStep.errors.occupation
                                  ? true
                                  : false
                              }
                            />
                            {validationStep.touched.occupation &&
                            validationStep.errors.occupation ? (
                              <FormFeedback type="invalid">
                                {validationStep.errors.occupation}
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
                              id="profilePicture"
                              name="profilePicture"
                              className="form-control"
                              placeholder="Upload your Profile picture"
                              type="file"
                              value={validationStep.values.profilePicture}
                              onChange={validationStep.handleChange}
                              onBlur={validationStep.handleBlur}
                              invalid={
                                validationStep.touched.profilePicture &&
                                validationStep.errors.profilePicture
                                  ? true
                                  : false
                              }
                            />
                            {validationStep.touched.profilePicture &&
                            validationStep.errors.profilePicture ? (
                              <FormFeedback type="invalid">
                                {validationStep.errors.profilePicture}
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
                              id="coverImage"
                              name="coverImage"
                              className="form-control"
                              placeholder="Upload your Cover image"
                              type="file"
                              value={validationStep.values.coverImage}
                              onChange={validationStep.handleChange}
                              onBlur={validationStep.handleBlur}
                              invalid={
                                validationStep.touched.coverImage &&
                                validationStep.errors.coverImage
                                  ? true
                                  : false
                              }
                            />
                            {validationStep.touched.coverImage &&
                            validationStep.errors.coverImage ? (
                              <FormFeedback type="invalid">
                                {validationStep.errors.coverImage}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </>
                      )}
                      {currentStep === 3 && (
                        <>
                          <div className="mb-3 mt-5">
                            {currentStep === 3 && (
                              <>
                                <div className="mb-3 mt-5 d-flex flex-column justify-content-center align-items-center">
                                  <label htmlFor="">
                                    What kind of a user are you?
                                  </label>
                                  <div
                                    role="group"
                                    className="form-check form-check-inline d-flex flex-column justify-content-center align-items-start"
                                  >
                                    <label className="form-check-label">
                                      <Input
                                        id="LEVEL01"
                                        name="userType"
                                        className="form-check-input"
                                        type="radio"
                                        value="LEVEL01"
                                        checked={
                                          validationStep.values.userType ===
                                          "LEVEL01"
                                        }
                                        onChange={validationStep.handleChange}
                                        onBlur={validationStep.handleBlur}
                                        invalid={
                                          validationStep.touched.userType &&
                                          validationStep.errors.userType
                                            ? true
                                            : false
                                        }
                                      />
                                      Willing to Donate
                                    </label>
                                    <label className="form-check-label">
                                      <Input
                                        id="LEVEL02"
                                        name="userType"
                                        className="form-check-input"
                                        type="radio"
                                        value="LEVEL02"
                                        checked={
                                          validationStep.values.userType ===
                                          "LEVEL02"
                                        }
                                        onChange={validationStep.handleChange}
                                        onBlur={validationStep.handleBlur}
                                        invalid={
                                          validationStep.touched.userType &&
                                          validationStep.errors.userType
                                            ? true
                                            : false
                                        }
                                      />
                                      Seeking Donations
                                    </label>
                                  </div>
                                  {validationStep.touched.userType &&
                                  validationStep.errors.userType ? (
                                    <FormFeedback type="invalid">
                                      {validationStep.errors.userType}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                                <p className="fs-12">
                                  *If you select "Seeking Donations", you will
                                  be asked for a confirmation
                                </p>
                              </>
                            )}
                          </div>
                        </>
                      )}

                      <div className="d-lg-flex justify-content-center mt-4 mb-5">
                        {currentStep === 1 ? (
                          <div className="w-auto h-auto d-flex align-items-center justify-content-between">
                            <button
                              className="login-btn"
                              type="button"
                              onClick={nextStep}
                            >
                              Next
                              <span className="fas fa-chevron-right ml-1 next-btn"></span>
                            </button>
                          </div>
                        ) : currentStep === 2 ? (
                          <div className="w-auto h-auto d-flex align-items-center justify-content-between">
                            <button
                              className="login-btn mr-1 "
                              type="button"
                              onClick={prevStep}
                            >
                              <span className="fas fa-chevron-right mr-1 prev-btn"></span>
                              Previous
                            </button>
                            <button
                              className="login-btn ml-1"
                              type="button"
                              onClick={nextStep}
                            >
                              Next
                              <span className="fas fa-chevron-right ml-1 next-btn"></span>
                            </button>
                          </div>
                        ) : (
                          <div className="w-auto h-auto d-flex align-items-center justify-content-between">
                            <button
                              className="login-btn mr-1"
                              type="button"
                              onClick={prevStep}
                            >
                              <span className="fas fa-chevron-right mr-1 prev-btn"></span>
                              Previous
                            </button>
                            <button className="login-btn" type="submit">
                              Sign Up
                              <span className="fas fa-chevron-right ml-1 next-btn"></span>
                            </button>
                          </div>
                        )}
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
