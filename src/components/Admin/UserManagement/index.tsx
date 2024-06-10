import React, { useState } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import NavBar from "../../common/NavBar";
import AdminUserManagement from "./AdminUserManagement";
// Import other management components
import PostManagement from "./PostManagement";
import ListingsManagement from "./ListingsManagement";
import RequestsManagement from "./RequestsManagement";

const UserManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("UserManagement");

  const renderContent = () => {
    switch (currentView) {
      case "UserManagement":
        return <AdminUserManagement />;
      case "PostManagement":
        return <PostManagement />;
      case "ListingsManagement":
        return <ListingsManagement />;
      case "RequestsManagement":
        return <RequestsManagement />;
      default:
        return <AdminUserManagement />;
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="sidepane-wrapper d-flex justify-content-center align-items-center">
          <div className="sidepane p-3 d-flex flex-column justify-content-start align-items-center">
            <div
              className="user-management w-100 d-flex justify-content-center align-items-center"
              onClick={() => setCurrentView("UserManagement")}
            >
              <span className="man-text">
                <i className="fas fa-users"></i> User Management
              </span>
            </div>
            <div
              className="post-management w-100 d-flex justify-content-center align-items-center"
              onClick={() => setCurrentView("PostManagement")}
            >
              <span className="man-text">
                <i className="fas fa-clipboard-list"></i> Post Management
              </span>
            </div>
            <div
              className="listings-management w-100 d-flex justify-content-center align-items-center"
              onClick={() => setCurrentView("ListingsManagement")}
            >
              <span className="man-text">
                <i className="fas fa-list"></i> Listings Management
              </span>
            </div>
            <div
              className="requests-management w-100 d-flex justify-content-center align-items-center"
              onClick={() => setCurrentView("RequestsManagement")}
            >
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
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
