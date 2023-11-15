import React, { useEffect, useState } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import createTournamentProfile from "../../../components/vendors/images/createTournamentProfile.svg";
import player2Profile from "../../../components/vendors/images/player2.png";
import CustomModal from "../../common/Modal";
import RightArrow from "../../vendors/images/icon/right-arrow.png";
import { AdminService } from "../../../services/AdminService";
import { User } from "../../../models/User";
import swal from "sweetalert";

const splittedURL = window.location.pathname.split("/");
const tournament_id = splittedURL[splittedURL.length - 1];
const UserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userdata, setUserdata] = useState<User>();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    AdminService.getUserDetails(tournament_id)
      .then((res: any) => {
        setUserdata(res.data);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  };
  const resetPassword = async () => {
    try {
      const { currentPassword, newPassword, confirmPassword } = formData;

      // console.log("currentPassword", currentPassword);
      // console.log("newPassword", newPassword);

      // console.log("Submitting password update...");

      if (newPassword === confirmPassword) {
        const response = await AdminService.resetPassword({
          currentPassword,
          newPassword,
        });
        if (response.success) {
          // console.log("Password changed successfully");
          swal("Password changed successfully", "", "success").then(() => {
            logout();
          });
        } else {
          // console.log("Failed to update password:", response.error);
          const errorMessage = response.error || "An error occurred";
          swal("Failed to update password:", errorMessage, "error");
        }
      } else {
        //  console.log("Passwords do not match");
        swal("Passwords do not match", "", "error");
      }
    } catch (error) {
      //   console.log("Error updating password:", error);
      const errorMessage = error || "An error occurred";
      swal("Passwords do not match", errorMessage, "error");
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="login-body profile d-lg-flex text-center ">
          <div className="box-1-create-tournament ">
            <div className="create-tournament-container border-r-10 width-450">
              <div className="mb-4">
                <span className="h3 h-1 text-center tournament-creation-header mb-5 py-4">
                  Profile Details
                </span>
              </div>

              <div className="textbox-create-tournament-title text-left d-flex align-items-center mar-btm-0 justify-content-between">
                <p className="textbox-create-tournament-title text-left">
                  Name :
                </p>
                <p className="font-weight-bold">{userdata?.name}</p>
              </div>
              <div className="textbox-create-tournament-title text-left d-flex align-items-center mar-btm-0 justify-content-between">
                <p className="textbox-create-tournament-title text-left">
                  Email :
                </p>
                <p className="font-weight-bold">{userdata?.email}</p>
              </div>
              <div className="text-left d-flex align-items-center justify-content-between">
                <p className="textbox-create-tournament-title text-left mb-0">
                  Update Password :
                </p>{" "}
                <div
                  className="arrow-btn2 update-btn"
                  onClick={handleOpenModal}
                >
                  <span className="f-color-white fw-500 font-Poppins update-fs">
                    Update
                  </span>
                  <img
                    className="arrow-icon-size ml-3"
                    src={RightArrow}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" box-2-create-tournament d-flex flex-column h-100">
            <img
              className="playerImage"
              src={player2Profile}
              alt="Right Background"
            />
            <div className="playerBackground"></div>
          </div>
        </div>
      </div>
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="py-3 px-3 update-modal">
          <div className="d-flex justify-content-center align-item-center mb-2">
            <p className="h3 fw-400 f-color-black3 font-Poppins text-left">
              Update your password
            </p>
          </div>
          <div className="mb-2 justify-content-between align-item-center">
            <label htmlFor="currentPassword">Current Password:</label>
            <div className="textbox-create-tournament mb-3">
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder=""
                value={formData.currentPassword}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    currentPassword: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="mb-2 justify-content-between align-item-center">
            <label htmlFor="newPassword">New Password:</label>
            <div className="textbox-create-tournament mb-3">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder=""
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-2 justify-content-between align-item-center">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="textbox-create-tournament mb-3">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=""
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="row pt-2 pl-3 pr-3 justify-content-center align-items-center">
            <button
              type="submit"
              className="arrow-btn2"
              onClick={resetPassword}
            >
              <span className="f-17 f-color-white fw-500 font-Poppins">
                Update
              </span>
              <img
                className="arrow-icon-size ml-3"
                src={RightArrow}
                alt="Arrow"
              />
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default UserProfile;
