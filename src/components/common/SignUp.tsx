import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { PublicService } from "../../services/PublicService";
import { RouteName } from "../../RouteName";
import "../vendors/styles/healthSpaceStyles.css";
import loginImageLeft from "../../components/vendors/images/loginImageLeft.svg";
import loginImageRight from "../../components/vendors/images/loginImageRight.jpg";
import rightBg from "../../components/vendors/images/right-bg.jpg";
import userIconLogin from "../../components/vendors/images/userIconLogin.svg";
import emailIconLogin from "../../components/vendors/images/emailIconLogin.svg";
import globeIcon from "../../components/vendors/images/globe-solid.svg";
import userLoginPasswordIcon from "../../components/vendors/images/userLoginPasswordIcon.svg";
import swal from "sweetalert";
import Logo from "../vendors/images/logo-text.png";
import { FormFeedback, Form, Input } from "reactstrap";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import {
  faBriefcase,
  faCalendar,
  faCity,
  faEnvelope,
  faKey,
  faPhone,
  faUser,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import FontAwesome from "react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp: React.FC = () => {
  const history = useHistory();
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpAttempts, setOtpAttempts] = useState(3);
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptAgreement, setAcceptAgreement] = useState(false);

  const handleAcceptAgreementChange = () => {
    setAcceptAgreement(!acceptAgreement);
  };

  const nextStep = () => {
    validationStep.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Validation errors:", errors);
        if (
          !errors.name &&
          !errors.email &&
          !errors.dob &&
          !errors.city &&
          !errors.password &&
          !errors.confirmPassword
        ) {
          console.log("first step okay");
          setCurrentStep(currentStep + 1);
        } else if (!errors.phone && !errors.occupation) {
          console.log("second step okay");
          setCurrentStep(currentStep + 1);
        } else {
          if (errors.name) {
            swal({
              title: "Error",
              text: `${errors.name}`,
              icon: "error",
            });
          } else if (errors.email) {
            swal({
              title: "Error",
              text: `${errors.email}`,
              icon: "error",
            });
          } else if (errors.dob) {
            swal({
              title: "Error",
              text: `${errors.dob}`,
              icon: "error",
            });
          } else if (errors.city) {
            swal({
              title: "Error",
              text: `${errors.city}`,
              icon: "error",
            });
          } else if (errors.password) {
            swal({
              title: "Error",
              text: `${errors.password}`,
              icon: "error",
            });
          } else if (errors.confirmPassword) {
            swal({
              title: "Error",
              text: `${errors.confirmPassword}`,
              icon: "error",
            });
          } else if (errors.phone) {
            swal({
              title: "Error",
              text: `${errors.phone}`,
              icon: "error",
            });
          } else if (errors.occupation) {
            swal({
              title: "Error",
              text: `${errors.occupation}`,
              icon: "error",
            });
          } else {
            swal({
              title: "Error",
              text: "An error occurred. Please try again later.",
              icon: "error",
            });
          }
        }
      }
    });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files && e.target.files[0];

    console.log(`file:: ${fieldName}::`, file);

    if (file) {
      console.log(`inside if file exists set ${fieldName}-------------------`);
      validationStep.setFieldValue(fieldName, file);
    }
  };

  const handleSignUp = async (data: any) => {
    console.log("inside handlesignUp : data", data);
    if (data) {
      console.log("data is available: inside if", data);
      try {
        console.log("inside try");

        const formData = new FormData();

        // Append other fields to FormData
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("dob", data.dob);
        formData.append("city", data.city);
        formData.append("phone", data.phone);
        formData.append("userType", data.userType);
        formData.append("occupation", data.occupation);
        formData.append("password", data.password);

        // Append profilePicture as a file to FormData
        formData.append("profilePicture", data.profilePicture);
        formData.append("coverImage", data.coverImage);

        console.log("formData", formData);

        const res = await PublicService.signUp(formData);
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
      profilePicture: undefined,
      coverImage: undefined,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      email: Yup.string().email("Email Invalid").required("Please Enter Email"),

      dob: Yup.date().required("Please Enter Date of Birth"),
      city: Yup.string().required("Please Enter City"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(40)
        .required("Please Enter  Password"),
      confirmPassword: Yup.string()
        .min(6, "Confirm password must be at least 6 characters")
        .max(40)
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please Re-enter Your Password"),
      phone: Yup.string().required("Please Enter Phone Number"),
      userType: Yup.string().required("Please Select User Type"),
      occupation: Yup.string().required("Please Enter Occupation"),
    }),
    onSubmit: async (values: any, { resetForm }) => {
      console.log("inside validationStep onSubmit");
      console.log("values", values);
      console.log("values.profilePicture", values.profilePicture);
      console.log("values.coverImage", values.coverImage);
      const userData = {
        name: values.name,
        email: values.email,
        dob: values.dob,
        city: values.city,
        phone: values.phone,
        userType: values.userType,
        occupation: values.occupation,
        password: values.password,
        profilePicture: values.profilePicture,
        coverImage: values.coverImage,
      };

      console.log("userData before handleSignUp:::::", userData);

      try {
        if (acceptAgreement) {
          handleSignUp(userData);
        } else {
          swal({
            title: "Error",
            text: "Please accept the terms and conditions",
            icon: "error",
          });
        }

        resetForm();
      } catch (error) {
        swal({
          title: "Error",
          text: "An error occurred. Please try again later.",
          icon: "error",
        });
        console.log("error++++++", error);
      }
    },
  });
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
        <div className="all-bg">
          <img src={loginImageRight} alt="Right Background" />
        </div>

        <div className="container">
          <div className="login-body d-lg-flex text-center">
            <div className="box-1 mt-md-0">
              <div className="mt-5 d-flex justify-content-center">
                <div className="login-form ">
                  <div className="w-100">
                    <NavLink to={"/login"}>
                      <img
                        src={Logo}
                        className="main-logo w-100"
                        alt="healthspace_logo"
                      />
                    </NavLink>
                  </div>
                  {isOtpRequired ? (
                    <Form className="form-horizontal">
                      <p className="h-1 text-center login-header">
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
                        console.log("e", e);
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
                            {/* <img
                              src={userIconLogin}
                              alt="Input Icon"
                              className="input-icon"
                            /> */}
                            <FontAwesomeIcon
                              icon={faUser}
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
                            <FontAwesomeIcon
                              icon={faEnvelope}
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
                            <Input
                              id="dob"
                              name="dob"
                              className="form-control pr-0"
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
                            <FontAwesomeIcon
                              icon={faCity}
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
                            <FontAwesomeIcon
                              icon={faKey}
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
                            <FontAwesomeIcon
                              icon={faKey}
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
                            <FontAwesomeIcon
                              icon={faPhone}
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
                            <FontAwesomeIcon
                              icon={faBriefcase}
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
                            <div className="custom-file">
                              <input
                                id="profilePicture"
                                name="profilePicture"
                                type="file"
                                className="custom-file-input"
                                onChange={(e) =>
                                  handleFileChange(e, "profilePicture")
                                }
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="profilePicture"
                              >
                                {validationStep.touched.profilePicture &&
                                validationStep.errors.profilePicture
                                  ? validationStep.errors.profilePicture
                                  : validationStep.values.profilePicture
                                  ? validationStep.values.profilePicture.name
                                  : "Choose profile picture..."}
                              </label>
                              {validationStep.touched.profilePicture &&
                              validationStep.errors.profilePicture ? (
                                <div className="invalid-feedback">
                                  {validationStep.errors.profilePicture}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="textbox2 mb-3">
                            <div className="custom-file">
                              <input
                                id="coverImage"
                                name="coverImage"
                                type="file"
                                className="custom-file-input"
                                onChange={(e) =>
                                  handleFileChange(e, "coverImage")
                                }
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="coverImage"
                              >
                                {validationStep.touched.coverImage &&
                                validationStep.errors.coverImage
                                  ? validationStep.errors.coverImage
                                  : validationStep.values.coverImage
                                  ? validationStep.values.coverImage.name
                                  : "Choose cover image..."}
                              </label>
                              {validationStep.touched.coverImage &&
                              validationStep.errors.coverImage ? (
                                <div className="invalid-feedback">
                                  {validationStep.errors.coverImage}
                                </div>
                              ) : null}
                            </div>
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
                                        id="RECEIVER"
                                        name="userType"
                                        className="form-check-input"
                                        type="radio"
                                        value="RECEIVER"
                                        checked={
                                          validationStep.values.userType ===
                                          "RECEIVER"
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
                                        id="DONOR"
                                        name="userType"
                                        className="form-check-input"
                                        type="radio"
                                        value="DONOR"
                                        checked={
                                          validationStep.values.userType ===
                                          "DONOR"
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
                                <div className="form-check mb-3">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="acceptAgreement"
                                    checked={acceptAgreement}
                                    onChange={handleAcceptAgreementChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="acceptAgreement"
                                  >
                                    I accept the terms and conditions
                                  </label>
                                  {/* Add validation message if needed */}
                                  {/* {acceptAgreementError && <div className="invalid-feedback">{acceptAgreementError}</div>} */}
                                </div>
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
            <div className="box-2 d-flex flex-column">
              <img src={rightBg} alt="Right Background" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
