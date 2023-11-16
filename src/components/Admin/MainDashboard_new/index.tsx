import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import RightArrow from "../../vendors/images/icon/right-arrow.png";
import Crick1 from "../../vendors/images/crick1.png";
import UserContext from "../../../context/UserContext";
import { NavLink } from "react-router-dom";

const Feed: React.FC = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      <div className={`min-h-full dashboard bg-white `}>
        <div className="container">
          <div className="row mb-10">
            <div className="col-md-7 h-auto">
              <div className="container-fluid mt-3 pl-pr-0 h-100">
                <div className="">
                  <div className="row mb-10">
                    <div className="col-md-12 h-auto">
                      <div className="container-fluid mt-3 pl-pr-0 h-100">
                        <div className="d-flex w-100 h-100 justify-content-center align-items-center outer-box bg-color-changed-toGradient border-w border-r-10 rounded">
                          <div className="row w-100 d-flex align-items-center">
                            <div className="col-md-8 d-flex justify-content-left align-items-center">
                              <h2>Welcome to CricView360</h2>
                            </div>
                            <div>
                              {" "}
                              <img className=" ml-3" src={Crick1} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex mb-10 justify-content-between">
                    <div className="col-md-12">
                      <div className=" mt-3 pl-pr-0 h-100">
                        <div className="d-flex w-100 h-100 justify-content-between align-items-center outer-box-changed bg-white border-w border-r-15 rounded pl-pr-0 pb-0">
                          <div className="col-md-3  h-100 d-flex justify-content-center align-items-center bg-color-changed border-w border-r-15 rounded ">
                            {user?.userType === "SUPER_ADMIN" ? (
                              <span className="mt-3 f-18 fw-700 font-Poppins">
                                Teams
                              </span>
                            ) : (
                              <NavLink
                                to={`/admin/my-matches/create-quick-match/${user?._id}`}
                              >
                                <div className="arrow-btn ">
                                  <span className="f-17 f-color-white fw-500 font-Poppins ">
                                    Quick Match
                                  </span>
                                  <img
                                    className="arrow-icon-size ml-3"
                                    src={RightArrow}
                                    alt=""
                                  />
                                </div>
                              </NavLink>
                            )}
                          </div>

                          <div
                            className="  d-flex flex-column col-md-4 ml-mr-2 
                             h-100 bg-color-changed  outer-box-changed border-w border-r-10 rounded pl-pr-6 justify-content-center align-items-center"
                          >
                            <h5 className="">Available Quick Matches</h5>
                            <p className="mt-4 avail-mtchs">1</p>
                          </div>

                          <div className="d-flex flex-column  col-md-4 ml-mr-2  h-100 bg-color-changed  outer-box-changed border-w border-r-10 rounded pl-pr-6 justify-content-center align-items-center">
                            <h5>Available Tournaments</h5>
                            <p className="mt-4 avail-mtchs">2</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 h-auto">
              <div className="container-fluid  pt-3 pb-2  mt-3  pl-pr-0 h-100">
                <div className="d-flex w-100 h-100 justify-content-center align-item-start outer-box-changed bg-color-changed border-w border-r-10 rounded">
                  <div className="ml-3 h-auto w-100">
                    <div className="row topic">
                      <div className="col-md-12 d-flex justify-content-left align-items-center font-weight-bold">
                        News
                      </div>
                    </div>
                    <div className="row notif pad-top">
                      <div className="col-md-12 d-flex justify-content-left align-items-start ">
                        <div className="scrollable-list w-100">
                          <ul className=" w-100">
                            <li>hiii</li>

                            {/* We can render other news items here */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pad-top">
            <div className="col-md-12">
              <div className="container-fluid mt-3 pl-pr-0">
                <div className="d-flex w-100  justify-content-center align-items-center outer-box bg-white border-w border-r-10 rounded h-auto pl-pr-0">
                  <div className="row w-100 max-h-table">
                    <div className="col-md-12 mb-4 d-flex justify-content-left align-items-center">
                      <div className="table-responsive">
                        <p className="font-weight-bold mt-3">
                          Tournament Summary
                        </p>
                        <div className="over-flow-x">
                          <table className="table">
                            <thead className="table-head-matches">
                              <tr className="text-center">
                                <th>Created date</th>
                                <th>Name</th>
                                <th>No. of matches</th>
                                <th>No. of teams</th>
                                <th>Overs per inning</th>
                              </tr>
                            </thead>
                            <tbody className="table-body-matches">
                              <tr className="team-row">
                                <td>14.11.2023</td>
                                <td>IPL</td>
                                <td className="team-sec">5</td>
                                <td>8</td>
                                <td>6</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
