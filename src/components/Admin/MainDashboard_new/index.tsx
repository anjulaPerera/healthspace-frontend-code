import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import RightArrow from "../../vendors/images/icon/right-arrow.png";
import Crick1 from "../../vendors/images/crick1.png";
import UserContext from "../../../context/UserContext";
import { NavLink } from "react-router-dom";
import CoverImg from "../../vendors/images/img2.jpg";
import Dp from "../../vendors/images/photo4.jpg";

const Feed: React.FC = () => {
  const [user] = useContext(UserContext);

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
                <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center">
                  Start Post
                </div>
              </div>
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center">
                  Feed
                </div>
              </div>
            </div>
            <div className="col-md-3 right-col-feed px-3 d-flex justify-content-center">
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
                <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center">
                  sdf
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
