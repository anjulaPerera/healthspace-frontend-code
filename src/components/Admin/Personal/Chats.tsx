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

const Chats: React.FC = () => {
  const [isCloseCurrentChat, setCloseCurrentChat] = useState<boolean>(false);
  const [shouldOpenNewChat, setShouldOpenNewChat] = useState<boolean>(false);
  const handleClickOnAChat = () => {
    console.log("Clicked on a chat");
    setShouldOpenNewChat(true);
  };

  const handleCloseChat = () => {
    console.log("Clicked on close chat");
    setCloseCurrentChat(!isCloseCurrentChat);
    setShouldOpenNewChat(false);
  };

  return (
    <>
      <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
        <div className="middle-content h-auto w-100 py-4 d-flex flex-column justify-content-center align-itmes-center">
          <p className="fw-800 mb-3 text-center">Chats</p>
          <div className="w-100 px-4 height-auto chats-container">
            <div
              className="w-100 d-flex flex-column px-3 align-items-start justify-content-center single-chat mb-1"
              onClick={handleClickOnAChat}
            >
              <div className="row w-100 px-4">
                <div className="col-md-2 dp-image">
                  <img src={Dp} alt="" className="dp-chat" />
                </div>
                <div className="col-md-10 name-and-last-msg d-flex flex-column align-items-start justify-content-center">
                  <p className="chat-name">Name</p>
                  <p className="chat-rec-msg">Last message...</p>
                </div>
              </div>
            </div>
            <div
              className="w-100 d-flex flex-column px-3 align-items-start justify-content-center single-chat mb-1 "
              onClick={handleClickOnAChat}
            >
              <div className="row w-100 px-4">
                <div className="col-md-2 dp-image">
                  <img src={Dp} alt="" className="dp-chat" />
                </div>
                <div className="col-md-10 name-and-last-msg d-flex flex-column align-items-start justify-content-center">
                  <p className="chat-name">Name</p>
                  <p className="chat-rec-msg">Last message...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            shouldOpenNewChat
              ? "chatter"
              : isCloseCurrentChat
              ? "hidden"
              : "hidden"
          }`}
        >
          <div className="chat-details w-100 p-2">
            <div className="row">
              <div className="col-md-10 d-flex justify-content-start align-items-center">
                <div className="row w-100">
                  <div className="col-md-3 remove-right-padding">
                    <img src={Dp} alt="" className="dp rounded-circle " />
                  </div>
                  <div className="col-md-4 d-flex justify-content-start align-items-center">
                    <p>Name</p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-1 d-flex justify-content-end align-items-center remove-right-padding cursor-pointer"
                onClick={handleCloseChat}
              >
                x
              </div>
            </div>

            <div className="chat-divider"></div>

            <div className="row mt-2">
              <div className="chat-body w-100 h-100 p-2">
                <div className="msg">df</div>
              </div>
            </div>
          </div>
          <div className="send-message w-100 h-auto p-1">
            <form action="">
              <div className="row w-100 px-3">
                <div className="col-md-11 d-flex justify-content-center align-items-center remove-right-padding">
                  <input
                    type="text"
                    className="w-100 rounded-input"
                    placeholder="Type a message..."
                  />
                </div>
                <div className="col-md-1 d-flex justify-content-center align-items-center remove-right-padding remove-left-padding">
                  <button
                    className="btn send-btn d-flex justify-content-center align-items-center remove-right-padding"
                    type="submit"
                  >
                    <span className="fas fa-chevron-right ml-1"></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
