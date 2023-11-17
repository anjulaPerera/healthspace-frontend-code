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

const Feed: React.FC = () => {
  const [user] = useContext(UserContext);
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [isCommentSent, setIsCommentSent] = useState<boolean>(false);

  const handleCommentBtnClick = () => {
    setIsCommentBtnClicked(!isCommentBtnClicked);
  };

  const handleCommentSendBtnClick = () => {
    setIsCommentSent(!isCommentSent);
  };

  return (
    <>
      <div className="full-screen">
        <div className="feed-container container px-14rem mt-5rem">
          <div className="row align-items-start">
            <div className="col-md-2 left-col-feed px-3 d-flex justify-content-center">
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
                <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center">
                  sdf
                </div>
              </div>
            </div>
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
                      <h3 className="mt-4">Anju Perera</h3>
                      <h6>Software Engineer</h6>
                    </div>
                    <div className="profile-img">
                      <img src={Dp} alt="" className="dp w-100 h-100" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                <div className="middle-content h-auto w-100 p-2 d-flex justify-content-center align-itmes-center">
                  <div className="w-100 d-flex justify-content-center align-itmes-center post-write">
                    <div className="row w-100">
                      <div className="col-md-2 d-flex justify-content-center align-itmes-center px-0">
                        <img src={Dp} alt="" className="search-dp" />
                      </div>
                      <div className="col-md-9 d-flex justify-content-center align-items-center px-0">
                        <input
                          type="text"
                          className="rounded-input w-100"
                          placeholder="Start a post..."
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center px-2">
                  <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column ">
                    <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
                      <div className="row w-100 d-flex">
                        <div className="col-md-2 remove-right-padding">
                          {" "}
                          <img src={Dp} alt="" className="search-dp" />
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
                          kdf sdjikf sdjf kjsdbnf jiksdnfjksdn sdjijksdb
                          sdjkfbsdjikbf sdjkfbsdjb kdf sdjikf sdjf kjsdbnf
                          jiksdnfjksdn sdjijksdb sdjkfbsdjikbf sdjkfbsdjb kdf
                          sdjikf sdjf kjsdbnf jiksdnfjksdn sdjijksdb
                          sdjkfbsdjikbf sdjkfbsdjb kdf sdjikf sdjf kjsdbnf
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
                        {/* <div className="hidden comment-section">kdf</div> */}
                      </div>
                      <div
                        className={`${
                          isCommentBtnClicked
                            ? "send-comment w-100 mt-3"
                            : "hidden"
                        }`}
                      >
                        <div className="w-100 d-flex justify-content-center align-itmes-center comment-write">
                          <div className="row w-100">
                            <div className="col-md-1 d-flex justify-content-center align-itmes-center px-0">
                              <img src={Dp} alt="" className="comment-dp" />
                            </div>
                            <div className="col-md-9 d-flex justify-content-center align-items-center px-0 ml-2">
                              <form
                                action=""
                                className="w-100 d-flex align-items-center"
                              >
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
                              <img src={Dp} alt="" className="dp-comment" />
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
                              <img src={Dp} alt="" className="dp-comment" />
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
