import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import RightArrow from "../../vendors/images/icon/right-arrow.png";
import Crick1 from "../../vendors/images/crick1.png";
import UserContext from "../../../context/UserContext";
import { NavLink } from "react-router-dom";
import CoverImg from "../../vendors/images/img2.jpg";
import Dp from "../../vendors/images/photo4.jpg";
import {
  faAngleUp,
  faMessage,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LikeButton from "./components/Like";
import { FaComment } from "react-icons/fa";
import SinglePost from "./components/SinglePost";
import { PostsService } from "../../../services/PostsService";
import { Posts } from "../../../models/Posts";

const Feed: React.FC = () => {
  const [user] = useContext(UserContext);
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [isCommentSent, setIsCommentSent] = useState<boolean>(false);
  const [posts, setPosts] = useState<Posts[]>([]);

  const handleCommentBtnClick = () => {
    setIsCommentBtnClicked(!isCommentBtnClicked);
  };

  const handleCommentSendBtnClick = () => {
    setIsCommentSent(!isCommentSent);
  };

  useEffect(() => {
    try {
      PostsService.getAllPosts()
        .then((res) => {
          console.log("get all posts res", res);

          if (res.data) {
            console.log("posts", res.data);
            setPosts(Array.isArray(res.data) ? res.data : []);
          } else {
            console.error("Invalid data structure received from the server.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="full-screen">
        <div className="feed-container container px-14rem mt-5rem">
          <div className="row align-items-start">
            <div className="col-md-2 left-col-feed px-3 d-flex justify-content-center">
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
                <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center">
                  Left Section
                </div>
              </div>
            </div>
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
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                <div className="middle-content h-auto w-100 p-2 d-flex justify-content-center align-itmes-center">
                  <div className="w-100 d-flex justify-content-center align-itmes-center post-write">
                    <div className="row w-100 pr-4">
                      <div className="col-md-2 d-flex justify-content-center align-itmes-center px-0">
                        <img
                          src={user?.profilePicture}
                          alt=""
                          className="search-dp"
                        />
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
                {posts.map((post, index) => (
                  <SinglePost key={index} post={post} />
                ))}
              </div>
            </div>
            <div className="col-md-3 right-col-feed px-3 d-flex justify-content-center">
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
                <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center">
                  right section
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
