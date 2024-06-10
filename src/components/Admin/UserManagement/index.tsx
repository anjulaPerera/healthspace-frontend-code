import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import NavBar from "../../common/NavBar";
import AdminUserManagement from "./AdminUserManagement";
import PostManagement from "./PostManagement";

const UserManagement: React.FC = () => {
  return (
    <>
      <NavBar />

      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="sidepane-wrapper d-flex justify-content-center align-items-center">
          <div className="sidepane p-3 d-flex flex-column justify-content-start align-items-center">
            <div className="user-management w-100 d-flex justify-content-center align-items-center">
              <span className="man-text">
                <i className="fas fa-users"></i> User Management
              </span>
            </div>
            <div className="post-management w-100 d-flex justify-content-center align-items-center">
              <span className="man-text">
                <i className="fas fa-clipboard-list"></i> Post Management
              </span>
            </div>
            <div className="listings-management w-100 d-flex justify-content-center align-items-center">
              <span className="man-text">
                <i className="fas fa-list"></i> Listings Management
              </span>
            </div>
            <div className="requests-management w-100 d-flex justify-content-center align-items-center">
              <span className="man-text">
                <i className="fas fa-hand-holding-heart"></i> Requests
                Management
              </span>
            </div>
          </div>
        </div>
        <div className="main-content-wrapper p-3 d-flex justify-content-center align-items-center">
          <div className="main-content-container d-flex justify-content-center align-items-start w-100 px-4 h-100">
            <div className="main-content rounded shadow d-flex justify-content-center align-items-center w-100 p-4">
              <PostManagement />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
