import React, { useEffect, useState, useContext } from "react";
import Dp from "../../../vendors/images/photo4.jpg";
import LikeButton from "./Like";
import UserContext from "../../../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Posts } from "../../../../models/Posts";
import { AdminService } from "../../../../services/AdminService";
import { User } from "../../../../models/User";

interface SinglePostProps {
  post: Posts;
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const [user] = useContext(UserContext);
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [isCommentSent, setIsCommentSent] = useState<boolean>(false);
  const [postOwner, setPostOwner] = useState<User>();
  const [timeElapsedAfterPosting, setTimeElapsedAfterPosting] =
    useState<string>("");
  const [postOwnerProfilePicture, setPostOwnerProfilePicture] =
    useState<string>("");
  const handleCommentBtnClick = () => {
    setIsCommentBtnClicked(!isCommentBtnClicked);
    setIsCommentSent(false);
  };

  const handleCommentSendBtnClick = () => {
    setIsCommentSent(!isCommentSent);
  };

  useEffect(() => {
    AdminService.getUserById(post?.userId)
      .then((res) => {
        console.log(res.data, "is the post owner");
        setPostOwner(res.data);
        if (res.data?.profilePicture) {
          const baseUrl = "http://localhost:9000";
          const absoluteUrl = `${baseUrl}/${res.data.profilePicture}`;
          console.log("Absolute URL:", absoluteUrl);
          setPostOwnerProfilePicture(absoluteUrl);
        }
      })
      .catch((err) => console.log(err));

    const postTimeElapsed = calculateTimeElapsed(post.createdAt);
    setTimeElapsedAfterPosting(postTimeElapsed);
  }, []);

  function calculateTimeElapsed(dateString: string | number | Date) {
    const currentDate = new Date();
    const previousDate = new Date(dateString);

    const timeDifference = currentDate.getTime() - previousDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else {
      return "Just now";
    }
  }

  return (
    <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center px-2 repeating-section-for-posts">
      <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column ">
        <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
          <div className="row w-100 d-flex">
            <div className="col-md-2 remove-right-padding">
              {" "}
              <img src={postOwnerProfilePicture} alt="" className="search-dp" />
            </div>
            <div className="col-md-10 remove-left-padding">
              <div className="row w-auto d-flex flex-column">
                <p className="name-post">{postOwner?.name}</p>
                <p className="job-post">{postOwner?.occupation}</p>
                <p className="time-post">{timeElapsedAfterPosting}</p>
              </div>
            </div>
          </div>
          <div className="row w-100">
            <div className="col-md-1"></div>
            <div className="col-md-11 ">
              <div className="separator-name-and-content"></div>
            </div>
          </div>
          <div className="row w-100 px-2 d-flex justify-content-left align-items-center">
            <p className="post-text">{post.content}</p>
          </div>
        </div>
        <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
          <div className="row w-100 d-flex justify-content-around align-items-center">
            <LikeButton
              likesFrom={post?.likesFrom || []}
              postId={post?._id || ""}
            />

            <div
              className="comment-post d-flex justify-content-around align-items-center cursor-pointer"
              onClick={
                !isCommentSent
                  ? handleCommentBtnClick
                  : () => {
                      handleCommentBtnClick();
                      handleCommentSendBtnClick();
                    }
              }
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="ml-1"
                style={{ color: "#4d4d4da6" }}
              />
              <p className="ml-1">Comment</p>
            </div>
          </div>
          <div
            className={`${
              isCommentBtnClicked ? "send-comment w-100 mt-3" : "hidden"
            }`}
          >
            <div className="w-100 d-flex justify-content-center align-itmes-center comment-write">
              <div className="row w-100">
                <div className="col-md-1 d-flex justify-content-center align-itmes-center px-0">
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="comment-dp"
                  />
                </div>
                <div className="col-md-9 d-flex justify-content-center align-items-center px-0 ml-2">
                  <form action="" className="w-100 d-flex align-items-center">
                    <input
                      type="text"
                      className="rounded-input w-100"
                      placeholder="Leave a comment..."
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />

                    <button
                      className="btn comment-send-btn d-flex justify-content-center align-items-center"
                      type="button"
                      onClick={handleCommentSendBtnClick}
                    >
                      Send
                      <span className="fas fa-chevron-right ml-1"></span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            className={` ${
              isCommentSent
                ? "w-100 h-auto d-flex flex-column justify-content-center align-items-center"
                : "hidden"
            }`}
          >
            <div className="w-100 h-auto d-flex flex-column justify-content-center align-items-center mt-3">
              <div className="row w-100">
                <div className="col-md-2 d-flex justify-content-center align-items-center w-100 h-auto remove-right-padding">
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="dp-comment"
                  />
                </div>
                <div className="col-md-8 px-1 d-flex justify-content-center align-items-center remove-left-padding">
                  <div className="w-100 h-auto p-2 d-flex flex-column justify-content-center align-items-start comment-body-container">
                    <div className="name">
                      <p className="bold">Anju Perera</p>
                    </div>
                    <div className="comment-body">
                      <p>This is a comment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 h-auto d-flex flex-column justify-content-center align-items-center mt-3">
              <div className="row w-100">
                <div className="col-md-2 d-flex justify-content-center align-items-center w-100 h-auto remove-right-padding">
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="dp-comment"
                  />
                </div>
                <div className="col-md-8 px-1 d-flex justify-content-center align-items-center remove-left-padding">
                  <div className="w-100 h-auto p-2 d-flex flex-column justify-content-center align-items-start comment-body-container">
                    <div className="name">
                      <p className="bold">Anju Perera</p>
                    </div>
                    <div className="comment-body">
                      <p>This is a comment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
