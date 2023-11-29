import React, { useEffect, useState, useContext } from "react";
import Dp from "../../../vendors/images/photo4.jpg";
import LikeButton from "./Like";
import UserContext from "../../../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const SinglePost = () => {
  const [user] = useContext(UserContext);
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [isCommentSent, setIsCommentSent] = useState<boolean>(false);

  const handleCommentBtnClick = () => {
    setIsCommentBtnClicked(!isCommentBtnClicked);
    setIsCommentSent(false);
  };

  const handleCommentSendBtnClick = () => {
    setIsCommentSent(!isCommentSent);
  };
  return (
    <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center px-2 repeating-section-for-posts">
      <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column ">
        <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
          <div className="row w-100 d-flex">
            <div className="col-md-2 remove-right-padding">
              {" "}
              <img src={user?.profilePicture} alt="" className="search-dp" />
            </div>
            <div className="col-md-10 remove-left-padding">
              <div className="row w-auto d-flex flex-column">
                <p className="name-post">Anju Perera</p>
                <p className="job-post">Software Engineer</p>
                <p className="time-post">10h</p>
              </div>
            </div>
          </div>
          <div className="row w-100">
            <div className="col-md-1"></div>
            <div className="col-md-11 ">
              <div className="separator-name-and-content"></div>
            </div>
          </div>
          <div className="row w-100 px-2 d-flex justify-content-center align-items-center">
            <p className="post-text">
              kdf sdjikf sdjf kjsdbnf jiksdnfjksdn sdjijksdb sdjkfbsdjikbf
              sdjkfbsdjb kdf sdjikf sdjf kjsdbnf jiksdnfjksdn sdjijksdb
              sdjkfbsdjikbf sdjkfbsdjb kdf sdjikf sdjf kjsdbnf jiksdnfjksdn
              sdjijksdb sdjkfbsdjikbf sdjkfbsdjb kdf sdjikf sdjf kjsdbnf
              jiksdnfjksdn sdjijksdb sdjkfbsdjikbf sdjkfbsdjb
            </p>
          </div>
        </div>
        <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
          <div className="row w-100 d-flex justify-content-around align-items-center">
            <LikeButton />
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
