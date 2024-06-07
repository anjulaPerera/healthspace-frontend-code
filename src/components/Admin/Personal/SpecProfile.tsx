import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import RightArrow from "../../vendors/images/icon/right-arrow.png";
import Crick1 from "../../vendors/images/crick1.png";
import UserContext from "../../../context/UserContext";
import { NavLink, useHistory, useParams } from "react-router-dom";
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
import { User } from "../../../models/User";
import { AdminService } from "../../../services/AdminService";
import { environment } from "../../../environment/environment";

interface SpecProfileProps {
  user: any;
}
interface RouteParams {
  userId: string;
}
const SpecProfile: React.FC<SpecProfileProps> = ({ user, children }) => {
  // const [user] = useContext(UserContext);
  const [userData, setUserData] = useState<any>(user);
  const { userId } = useParams<RouteParams>();
  const [specUserPP, setSpecUserPP] = useState<string | undefined>(undefined);
  const [specUserCP, setSpecUserCP] = useState<string | undefined>(undefined);

  useEffect(() => {
    AdminService.getUserById(userId).then((res) => {
      console.log("res", res.data);
      const userData: User = res.data;
      if (res.data?.profilePicture) {
        const baseUrl = environment.api_url;
        const absoluteUrl = `${baseUrl}/${res.data.profilePicture}`;
        console.log("Absolute URL:", absoluteUrl);
        setSpecUserPP(absoluteUrl);
      }
      if (res.data?.coverImage) {
        const baseUrl = environment.api_url;
        const absoluteUrl = `${baseUrl}/${res.data.coverImage}`;
        console.log("Absolute URL:", absoluteUrl);
        setSpecUserCP(absoluteUrl);
      }
      setUserData(userData);
    });
  }, []);

  return (
    <>
      <div className="col-md-8 middle-col-feed px-3 d-flex justify-content-center flex-column">
        <div className="w-100 h-auto bg-white feed-component-common rounded-corners">
          <div className="middle-content h-auto w-100 d-flex justify-content-center align-itmes-center profile-details rounded-corners">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column pos-rel">
              <div className="cover-img d-flex justify-content-center align-items-center rounded-corners-top">
                <img
                  src={specUserCP}
                  alt=""
                  className="rounded-corners-top w-100 h-100"
                />
              </div>
              <div className="dets d-flex justify-content-center align-items-center rounded-corners-bottom flex-column">
                <div className="d-flex justify-content-center align-items-center">
                  <h3 className="mt-4 mb-2">{userData?.name}</h3>{" "}
                  <span className="identifier">
                    {userData?.userType === "DONOR" ? "DONOR" : "SEEKER"}
                  </span>
                </div>
                <h6>{userData?.occupation}</h6>
              </div>
              <div className="profile-img">
                {userData?.profilePicture && (
                  <img
                    src={specUserPP}
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

export default SpecProfile;
