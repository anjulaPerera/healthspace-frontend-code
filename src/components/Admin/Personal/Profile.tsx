import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import RightArrow from "../../vendors/images/icon/right-arrow.png";
import Crick1 from "../../vendors/images/crick1.png";
import UserContext from "../../../context/UserContext";
import { NavLink, useHistory } from "react-router-dom";
import CoverImg from "../../vendors/images/img2.jpg";
import Dp from "../../vendors/images/photo4.jpg";
import {
  faAngleUp,
  faMessage,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { FaComment } from "react-icons/fa";
import SinglePost from "../MainDashboard_new/components/SinglePost";
import Chats from "./Chats";

const Profile: React.FC = () => {
  const [user] = useContext(UserContext);
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [isCommentSent, setIsCommentSent] = useState<boolean>(false);
  const history = useHistory();

  const handleCommentBtnClick = () => {
    setIsCommentBtnClicked(!isCommentBtnClicked);
  };

  const handleCommentSendBtnClick = () => {
    setIsCommentSent(!isCommentSent);
  };

  useEffect(() => {
    // Save the current path to session storage
    sessionStorage.setItem("currentPath", history.location.pathname);
  }, [history.location.pathname]);

  useEffect(() => {
    // Check if there is a saved path in session storage
    const savedPath = sessionStorage.getItem("currentPath");

    if (savedPath) {
      // If a path is saved, navigate to it
      history.replace(savedPath);
    } else {
      // If no path is saved, save the current path
      sessionStorage.setItem("currentPath", history.location.pathname);
    }
  }, [history]);

  return (
    <>
      <div className="full-screen">
        <div className="feed-container container px-14rem mt-5rem">
          <div className="row align-items-start">
            <div className="col-md-7 middle-col-feed px-3 d-flex justify-content-center flex-column">
              <div className="w-100 h-auto bg-white feed-component-common rounded-corners">
                <div className="middle-content h-auto w-100 d-flex justify-content-center align-itmes-center profile-details rounded-corners">
                  <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column pos-rel">
                    <div className="cover-img d-flex justify-content-center align-items-center rounded-corners-top">
                      <img
                        src={CoverImg}
                        alt=""
                        className="rounded-corners-top w-100 h-100"
                      />
                    </div>
                    <div className="dets d-flex justify-content-center align-items-center rounded-corners-bottom flex-column">
                      <h3 className="mt-4 mb-2">Anju Perera</h3>
                      <h6>Software Engineer</h6>
                    </div>
                    <div className="profile-img"></div>
                  </div>
                </div>
              </div>
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                <div className="middle-content h-auto w-100 p-2 d-flex justify-content-center align-itmes-center">
                  <div className="w-100 d-flex justify-content-center align-itmes-center post-write">
                    <div className="row w-100 pr-4">
                      <div className="col-md-2 d-flex justify-content-center align-itmes-center px-0">
                        <img src={Dp} alt="" className="search-dp" />
                      </div>
                      <div className="col-md-10 d-flex justify-content-center align-items-center px-0">
                        <input
                          type="text"
                          className="rounded-input w-100"
                          placeholder="Start a post..."
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                        <div className="post-btn d-flex justify-content-center align-items-center cursor-p">
                          <span className="ml-1">Post</span>
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="ml-1"
                            style={{ color: "#4d4d4da6" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                <SinglePost />
              </div>
            </div>
            <div className="col-md-5 right-col-feed px-3 d-flex justify-content-center">
              <Chats />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
