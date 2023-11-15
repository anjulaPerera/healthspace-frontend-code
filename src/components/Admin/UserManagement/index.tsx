import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import { useHistory } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { AdminService } from "../../../services/AdminService";
import swal from "sweetalert";
import UserContext from "../../../context/UserContext";

const UserManagement: React.FC = () => {
  const [modalCenter, setModalCenter] = useState(false);
  const [userData, setUserData] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(1);
  const [customerAdmin, setCustomerAdmin] = useState([] as any[]);
  const LIMIT = 10;
  const [user] = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    viewAllUsers(LIMIT, offset);
  }, []);
  const viewAllUsers = (limit: number, offSet: number) => {
    AdminService.getAllUserListByAdmin(limit, offSet).then((res) => {
      setCustomerAdmin(res.data);
      setIsLoading(false);
      setHasMore(res.data?.length > 0 && res.data?.length == limit);
    });
  };

  const seeMore = () => {
    const newOffset = offset + 1;

    setOffset(newOffset);

    AdminService.getAllUserListByAdmin(LIMIT, newOffset).then((res) => {
      if (res.success) {
        setCustomerAdmin((previousSessions) => {
          return [...new Set([...previousSessions, ...res.data])];
        });
        setHasMore(res.data?.length > 0 && res.data?.length == LIMIT);
        setIsLoading(false);
      }
    });
  };
  function togCenter() {
    //  console.log("togcenter clicked")
    setModalCenter(!modalCenter);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  function togCenterClose() {
    setModalCenter(false);
  }

  const formatNumber = (number: number) => {
    if (number === 10) {
      return "10+";
    } else if (number > 10 && number % 10 === 0) {
      return `${number}+`;
    } else {
      return number;
    }
  };
  const clickViewTournament = (userId: any) => {
    history.push(`/admin/user-tournament/${userId}`);
  };
  return (
    <>
      <div className="main-container">
        <div className="pd-ltr-20">
          <div className="card-box pd-20 height-100-p mb-30 mt-20">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="d-flex  title mb-15  col-md-9 col-sm-12 mb-20 ">
                <h5 className="cardHearder font-Poppins mr-20  ">All Users </h5>
                <span className="card-text-count  bg-blue7 pr-2 pl-2  f-color-white rounded">
                  {formatNumber(customerAdmin.length)}
                </span>
              </div>
              <div className="col-md-3"></div>

              <div className="table-responsive">
                {!isLoading && customerAdmin.length > 0 && (
                  <table className="table">
                    <thead className="table-head-matches ">
                      <tr className="text-center">
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Subscription</th>
                        <th scope="col">UserStatus</th>
                        <th scope="col"></th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-body-matches ">
                      {!isLoading &&
                        customerAdmin.length > 0 &&
                        customerAdmin &&
                        customerAdmin.map((cus, index) => (
                          <tr key={index} className="text-center">
                            <td>{cus?.name}</td>
                            <td>{cus?.email}</td>
                            <td>{cus?.packageBought}</td>
                            {/* <td>{cus?.userType}</td> */}
                            <td>{cus?.userStatus}</td>
                            <td>
                              <button
                                className="btn btn-primary bg-blue7 p-2 f-color-white font-Poppins"
                                onClick={() => clickViewTournament(cus._id)}
                              >
                                View tournament
                              </button>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center align-items-center">
                                <button
                                  className={`${
                                    cus.userStatus === "ACTIVE"
                                      ? "btn btn-danger btn-sm mr-2"
                                      : "btn btn-dark btn-sm mr-2"
                                  }`}
                                  title={`${
                                    cus.userStatus === "ACTIVE"
                                      ? "Deactivate user"
                                      : "Activate user"
                                  }`}
                                >
                                  <i className="micon dw dw-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>

              {!isLoading && (
                <Row className=" d-flex justify-content-center align-items-center">
                  <Col xl="12 mt30 text-center">
                    {hasMore && (
                      <button
                        className="btn btn-warning mt-3"
                        onClick={() => seeMore()}
                      >
                        See More
                      </button>
                    )}
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
