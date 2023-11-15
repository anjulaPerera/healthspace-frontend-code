import React, { useContext, useEffect, useState } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import correct from "../../vendors/images/icon/correct1.png";
import checkWhite from "../../vendors/images/icon/check-white.png";
import { AdminService } from "../../../services/AdminService";
import swal from "sweetalert";
import { FormFeedback, Form, Input, Label, Modal, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserContext from "../../../context/UserContext";
import { PaymentState } from "../../../PaymentState";
const splittedURL = window.location.pathname.split("/");
const user_id = splittedURL[splittedURL.length - 1];
interface Paymentstate {
  silverPaymentState: string;
  goldPaymentState: string;
}
const UpgradePlan: React.FC = () => {
  const [reload, setReload] = useState(false);
  const [modalCenter, setModalCenter] = useState(false);

  const [user] = useContext(UserContext);

  const [goldPayLink, setGoldPayLink] = useState("");
  const [silverPayLink, setSilverPayLink] = useState("");
  const [previouslyRequestedPackage, setPreviouslyRequestedPackage] =
    useState("");
  const [silverPaymentState, setSilverPaymentState] = useState("");
  const [goldPaymentState, setGoldPaymentState] = useState("");
  const [isSilverPlanRequested, setIsSilverPlanRequested] = useState(false);
  const [isGoldPlanRequested, setIsGoldPlanRequested] = useState(false);
  const [isLinkForSilverAvailable, setIsLinkForSilverAvailable] =
    useState(false);
  const [isLinkForGoldAvailable, setIsLinkForGoldAvailable] = useState(false);
  const [isPaidForSilver, setIsPaidForSilver] = useState(false);
  const [isPaidForGold, setIsPaidForGold] = useState(false);
  const [packageBought, setPackageBought] = useState("");

  console.log("user from upgrade plan page =>", user);
  function togCenter() {
    setModalCenter(!modalCenter);
    removeBodyCss();
  }
  function togCenterLink() {
    setModalCenter(!modalCenter);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  function togCenterClose() {
    setModalCenter(false);
  }
  const updateAction = () => {
    sessionStorage.clear();
    togCenterLink();
  };

  const handleUpgradeToSilver = () => {
    const splittedURL = window.location.pathname.split("/");
    const userid = splittedURL[splittedURL.length - 1];
    if (userid) {
      swal({
        title: "Are you sure?",
        text: " You want to Upgrade the package to silver?",
        icon: "info",
        buttons: ["Cancel", "Confirm"],
        dangerMode: false,
        className: "custom-swal",
      }).then((confirmed) => {
        if (confirmed) {
          sessionStorage.setItem("selectedPackage", "no");
          AdminService.upgradePlanRequesttoSilver(userid).then((userid) => {
            if (userid) {
              swal({
                title: "Success",
                text: "You will recieve payment link shortly",
                icon: "success",
                buttons: ["Ok"],
                dangerMode: false,
                className: "custom-swal",
              }).then((confirmed) => {
                setReload(!reload);
                document.cookie =
                  "selectedPackage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
              });
            }
          });
        }
      });
    }
  };

  const handleUpgradeToGold = () => {
    const splittedURL = window.location.pathname.split("/");
    const userid = splittedURL[splittedURL.length - 1];
    if (userid) {
      swal({
        title: "Are you sure?",
        text: " You want to Upgrade the package to gold?",
        icon: "info",
        buttons: ["Cancel", "Confirm"],
        dangerMode: false,
        className: "custom-swal",
      }).then((confirmed) => {
        if (confirmed) {
          sessionStorage.setItem("selectedPackage", "no");

          AdminService.upgradePlanRequesttoGold(userid).then((userid) => {
            if (userid) {
              swal({
                title: "Success",
                text: "You will recieve payment link shortly",
                icon: "success",
                buttons: ["Ok"],
                dangerMode: false,
                className: "custom-swal",
              }).then((confirmed) => {
                setReload(!reload);
                document.cookie =
                  "selectedPackage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
              });
            }
          });
        }
      });
    }
  };

  const sendReferenceNow = async (reference: any, userId: any) => {
    const requestedPackage =
      user?.goldPaymentState === "NONE"
        ? "PAY_LINK_REQUESTED_SILVER"
        : user?.silverPaymentState === "NONE"
        ? "PAY_LINK_REQUESTED_GOLD"
        : "";
    console.log("requestedPackage=====> ", requestedPackage);
    const referenceData = {
      userId: userId,
      reference: reference,
      requestedPackage: requestedPackage,
    };

    console.log("referenceData =>", referenceData);

    AdminService.confirmPayment(referenceData).then((res) => {
      console.log("inside service====>");
      console.log(
        "inside confirm payment admin service",
        "::referenceData::",
        referenceData,
        "::res::",
        res
      );
      const errorMsg = res?.error;

      if (res.success) {
        swal("Confirmation sent", "Payment confirmed successfully", "success");
      } else {
        errorMsg && swal("Error!", errorMsg, "error");
      }
    });
  };

  const validationStepLink = useFormik({
    enableReinitialize: true,
    initialValues: {
      reference: "",
    },
    validationSchema: Yup.object({
      reference: Yup.string().required("Please Enter payment reference"),
    }),
    onSubmit: (values, { resetForm }) => {
      const splittedURL = window.location.pathname.split("/");
      const userID = splittedURL[splittedURL.length - 1];
      const referenceData = {
        userId: userID,
        reference: values.reference,
      };

      sendReferenceNow(referenceData?.reference, referenceData?.userId);
      resetForm();
    },
  });

  useEffect(() => {
    AdminService.getPaymentState(user?._id)
      .then((res) => {
        const { silverPaymentState, goldPaymentState } =
          res.data as unknown as Paymentstate;
        setSilverPaymentState(silverPaymentState);
        setGoldPaymentState(goldPaymentState);

        setIsSilverPlanRequested(
          silverPaymentState === "PAY_LINK_REQUESTED_SILVER" ? true : false
        );
        setIsGoldPlanRequested(
          goldPaymentState === "PAY_LINK_REQUESTED_GOLD" ? true : false
        );
        setIsLinkForSilverAvailable(
          silverPaymentState === "PAY_LINK_SENT" ? true : false
        );
        setIsLinkForGoldAvailable(
          goldPaymentState === "PAY_LINK_SENT" ? true : false
        );
        setIsPaidForSilver(silverPaymentState === "PAID" ? true : false);
        setIsPaidForGold(goldPaymentState === "PAID" ? true : false);
      })
      .catch((err) => {
        console.log("error in getPaymentState =>", err);
      });
  }, [reload]);
  useEffect(() => {
    AdminService.getGoldPayLink(user?._id)
      .then((res) => {
        console.log("res in getGoldPayLink =>", res);
        setGoldPayLink(res?.data?.toString());
      })
      .catch((err) => {
        console.log("error in getGoldPayLink =>", err);
      });
  }, []);
  useEffect(() => {
    AdminService.getSilverPayLink(user?._id)
      .then((res) => {
        console.log("res in getSilverPayLink =>", res);
        setSilverPayLink(res?.data?.toString());
      })
      .catch((err) => {
        console.log("error in getGoldPayLink =>", err);
      });
  }, []);
  useEffect(() => {
    AdminService.previouslyRequestedPackage(user?._id)
      .then((res) => {
        console.log("res in previouslyRequestedPackage =>", res);
        setPreviouslyRequestedPackage(res?.data?.toString());
      })
      .catch((err) => {
        console.log("error in previouslyRequestedPackage =>", err);
      });
  }, []);

  useEffect(() => {
    AdminService.getPackageBought(user?._id)
      .then((res) => {
        console.log("res in getPackageBought =>", res.data.packageBought);
        const packageBought = res.data.packageBought;
        if (packageBought === "FREE") {
          setPackageBought("FREE");
        } else if (packageBought === "SILVER") {
          setPackageBought("SILVER");
        } else if (packageBought === "GOLD") {
          setPackageBought("GOLD");
        }
      })
      .catch((err) => {
        console.log("error in getPackageBought =>", err);
      });
  });

  return (
    <>
      <div className="main-container">
        <div className="login-body d-lg-flex text-center w-100 bg-color-changed-toGradient">
          <div className="w-100 h-auto">
            <div className="w-100 package-container">
              <div className="row pad-20 jus-ar">
                <div
                  className={`col-md-4 ${
                    isSilverPlanRequested ||
                    isGoldPlanRequested ||
                    isLinkForSilverAvailable ||
                    isLinkForGoldAvailable ||
                    isPaidForSilver ||
                    isPaidForGold
                      ? "column-hidden"
                      : ""
                  } `}
                >
                  <div className="free rounded d-flex">
                    <div className="plan-top">
                      <div className="plan-sum free-plan">
                        <h4> Free Plan</h4>
                      </div>
                    </div>
                    <div className="plan-bot">
                      <div className="features">
                        <div className="feature">
                          <div className="mr-10 ic mt-1 ">
                            <img src={correct} alt="" />
                          </div>
                          <div>Score $ Live Stream</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Ball by ball update</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Visualize Score</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Analyse Score</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Summary of match result</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>One match allowed</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Summary of match result</div>
                        </div>
                      </div>
                      <div className="up-btn hidden">
                        <button className="disable">Upgrade</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-md-4 ${
                    isGoldPlanRequested ||
                    isLinkForGoldAvailable ||
                    isPaidForGold
                      ? "column-hidden"
                      : ""
                  } `}
                >
                  <div className="free silver rounded d-flex">
                    <div className="plan-top">
                      <div className="plan-sum free-plan">
                        {" "}
                        <h4>
                          {" "}
                          Silver Plan <br /> $15
                        </h4>
                      </div>
                      <div className="per-month">Per Month</div>
                    </div>
                    <div className="plan-bot">
                      <div className="features">
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Score $ Live Stream</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Ball by ball update</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Visualize Score</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Analyse Score</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Summary of match result</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>1 Tournament + 15 matches</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>One Tournament is allowed</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Summary of Series Result</div>
                        </div>
                      </div>
                      <div
                        className={`mt-4 up-btn-clicked ${
                          silverPaymentState === "NONE" ? "" : "hidden"
                        } `}
                      >
                        <button onClick={handleUpgradeToSilver}>
                          Upgrade to Silver
                        </button>
                      </div>
                      <div
                        className={`mt-4 up-btn ${
                          silverPaymentState === "PAY_LINK_REQUESTED_SILVER" &&
                          (silverPayLink === undefined ||
                            silverPayLink === "" ||
                            silverPayLink === null)
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <button>You will receive a payment link soon</button>
                      </div>
                      <div
                        className={`mt-4 up-btn-paid ${
                          silverPayLink !== undefined &&
                          silverPayLink !== "" &&
                          silverPayLink !== null
                            ? ""
                            : "hidden"
                        } ${silverPaymentState === "PAID" ? "hidden" : ""}`}
                      >
                        <button
                          onClick={
                            silverPaymentState === "PAY_LINK_SENT"
                              ? () => {
                                  const absolutePayLink =
                                    silverPayLink.startsWith("http")
                                      ? silverPayLink
                                      : "https://" + silverPayLink;

                                  window.open(absolutePayLink, "_blank");
                                }
                              : () => {
                                  console.log("Link requested for Gold");
                                }
                          }
                        >
                          Link Available
                        </button>
                      </div>
                      <div
                        className={`mt-4 up-btn-confirmed cursor-default  ${
                          goldPaymentState === "NONE" ||
                          (silverPaymentState === "NONE" &&
                            packageBought !== "SILVER")
                            ? "hidden"
                            : ""
                        } ${
                          silverPaymentState === "PAID"
                            ? "not-hidden"
                            : "hidden"
                        } ${packageBought === "SILVER" ? "hidden" : ""}`}
                      >
                        <button>Paid</button>
                      </div>
                      {/* <div
                        className={`mt-4 up-btn-paid ${
                          packageBought === "SILVER" ? "" : "hidden"
                        }`}
                      >
                        <button>Silver Package Activated</button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className={`col-md-4`}>
                  <div className="free gold rounded d-flex">
                    <div className="plan-top">
                      <div className="plan-sum free-plan">
                        {" "}
                        <h4>
                          {" "}
                          Gold Plan <br /> $25
                        </h4>
                      </div>
                      <div className="per-month">Per Month</div>
                    </div>
                    <div className="plan-bot">
                      <div className="features">
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Score $ Live Stream</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Ball by ball update</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Visualize Score</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Analyse Score</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Summary of match result</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Unlimited tournements</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Unlimited matches</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Summary of Series Result</div>
                        </div>
                        <div className="feature">
                          <div className="mr-10 ic mt-1">
                            <img src={correct} alt="" />
                          </div>
                          <div>Decision-making statistics</div>
                        </div>
                      </div>
                      <div
                        className={`mt-4 up-btn-clicked ${
                          goldPaymentState === "NONE" ? "" : "hidden"
                        } `}
                      >
                        <button onClick={handleUpgradeToGold}>
                          Upgrade to Gold
                        </button>
                      </div>
                      <div
                        className={`mt-4 up-btn ${
                          goldPaymentState === "PAY_LINK_REQUESTED_GOLD" &&
                          (goldPayLink === undefined ||
                            goldPayLink === "" ||
                            goldPayLink === null)
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <button>You will receive a payment link soon</button>
                      </div>
                      <div
                        className={`mt-4 up-btn-paid ${
                          goldPayLink !== undefined &&
                          goldPayLink !== "" &&
                          goldPayLink !== null
                            ? ""
                            : "hidden"
                        } ${goldPaymentState === "PAID" ? "hidden" : ""}`}
                      >
                        <button
                          onClick={
                            goldPaymentState === "PAY_LINK_SENT"
                              ? () => {
                                  const absolutePayLink =
                                    goldPayLink.startsWith("http")
                                      ? goldPayLink
                                      : "https://" + goldPayLink;

                                  window.open(absolutePayLink, "_blank");
                                }
                              : () => {
                                  console.log("Link requested for Silver");
                                }
                          }
                        >
                          Link Available
                        </button>
                      </div>
                      <div
                        className={`mt-4 up-btn-confirmed cursor-default ${
                          silverPaymentState === "NONE" ||
                          (goldPaymentState === "NONE" &&
                            packageBought !== "GOLD")
                            ? "hidden"
                            : ""
                        } ${
                          goldPaymentState === "PAID" ? "not-hidden" : "hidden"
                        } ${packageBought === "GOLD" ? "hidden" : ""}`}
                      >
                        <button>Paid</button>
                      </div>
                      {/* <div
                        className={`mt-4 up-btn-paid ${
                          packageBought === "GOLD" ? "" : "hidden"
                        }`}
                      >
                        <button>Gold Package Activated</button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  (isLinkForGoldAvailable || isLinkForSilverAvailable) &&
                  silverPaymentState !== "PAID" &&
                  goldPaymentState !== "PAID"
                    ? "row pad-10 jus-ar "
                    : "row pad-10 jus-ar column-hidden"
                }
              >
                <div className="col-md-4 d-flex align-items-center">
                  <div className="con-p-btn up-btn-confirm ">
                    <p className="">Already paid for your new package?</p>
                    <button
                      className="d-flex justify-content-center align-items-center"
                      onClick={() => {
                        updateAction();
                      }}
                    >
                      Confirm Payment{" "}
                      <img className="ml-2" src={checkWhite} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              isOpen={modalCenter}
              toggle={() => {
                togCenter();
              }}
              centered
            >
              <div>
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Send/Update Payment Link</h5>
                  <button
                    type="button"
                    onClick={() => {
                      togCenterLink();
                    }}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validationStepLink.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <div className="d-flex">
                          <Label className="form-label">
                            Enter payment reference here
                          </Label>
                          <i
                            className="fa fa-star fa-xs mt-1 ms-1"
                            style={{ fontSize: "5px" }}
                          />
                        </div>

                        <Input
                          name="reference"
                          type="text"
                          placeholder="Enter payment reference"
                          value={validationStepLink.values.reference}
                          onChange={validationStepLink.handleChange}
                          onBlur={validationStepLink.handleBlur}
                          invalid={
                            validationStepLink.touched.reference &&
                            validationStepLink.errors.reference
                              ? true
                              : false
                          }
                        />
                        {validationStepLink.touched.reference &&
                        validationStepLink.errors.reference ? (
                          <FormFeedback type="invalid">
                            {validationStepLink.errors.reference}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="row float-right newCustomerRes">
                        <button
                          type="submit"
                          className="btn-save mr-3 mt-2 btn-sm font-Poppins mb-4"
                          onClick={() => {
                            setModalCenter(false);
                            togCenterLink();
                          }}
                        >
                          {" "}
                          Submit
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradePlan;
