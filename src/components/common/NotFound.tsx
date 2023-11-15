import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import "../App.css";
//import { If } from "../util/If";
import "./loader.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
//import { useTranslation } from "react-i18next";
import errorImg from "../../components/vendors/images/error-img.png";
import { Role } from "../../models/Role";
export const NotFound: React.FC = ({ children }) => {
  // const { t } = useTranslation();
  const [user] = useContext(UserContext);
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  setTimeout(() => {
    setLoader(false);
    setErrorMessage(true);
  }, 2000);

  return (
    <React.Fragment>
      <div className="container my-5 pt-5">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 className="display-2 font-weight-medium">
                  40
                  <i className="bx bx-buoy bx-spin text-primary display-3" />4
                </h1>
                <h4 className="text-uppercase">Sorry, page not found</h4>
                <div className="mt-5 text-center">
                  {user?.userType === Role.SUPER_ADMIN ? (
                    <Link
                      className="btn btn-primary "
                      to="/admin/user-management"
                    >
                      Back to Dashboard
                    </Link>
                  ) : (
                    <Link className="btn btn-primary " to="/login">
                      Back to Dashboard
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={errorImg} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
