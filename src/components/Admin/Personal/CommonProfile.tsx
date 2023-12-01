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
import CreatePost from "../MainDashboard_new/components/CreatePost";
import { Posts } from "../../../models/Posts";
import { PostsService } from "../../../services/PostsService";

const CommonProfile: React.FC = ({ children }) => {
  const [user] = useContext(UserContext);
  useState<boolean>(false);
  return (
    <>
      <div className="col-md-7 middle-col-feed px-3 d-flex justify-content-center flex-column">
        <div className="w-100 h-auto bg-white feed-component-common rounded-corners">
          <div className="middle-content h-auto w-100 d-flex justify-content-center align-itmes-center profile-details rounded-corners">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column pos-rel">
              <div className="cover-img d-flex justify-content-center align-items-center rounded-corners-top">
                <img
                  src={user?.coverImage}
                  alt=""
                  className="rounded-corners-top w-100 h-100"
                />
              </div>
              <div className="dets d-flex justify-content-center align-items-center rounded-corners-bottom flex-column">
                <h3 className="mt-4 mb-2">{user?.name}</h3>
                <h6>{user?.occupation}</h6>
              </div>
              <div className="profile-img">
                {user?.profilePicture && (
                  <img
                    src={user?.profilePicture}
                    alt="Profile Picture"
                    className="dp w-100 h-100 feed-up"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
};

export default CommonProfile;
