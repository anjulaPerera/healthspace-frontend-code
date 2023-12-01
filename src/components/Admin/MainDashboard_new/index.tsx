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
import CreatePost from "./components/CreatePost";
import CommonProfile from "../Personal/CommonProfile";

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
            const allPosts: any = res.data;
            const sortedPosts = [...allPosts].sort((a: Posts, b: Posts) => {
              const dateA = new Date(a?.createdAt || 0).getTime();
              const dateB = new Date(b?.createdAt || 0).getTime();
              return dateB - dateA;
            });

            setPosts(sortedPosts);
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
            <CommonProfile>
              <CreatePost />
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                {posts.map((post, index) => (
                  <SinglePost key={index} post={post} />
                ))}
              </div>
            </CommonProfile>
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
