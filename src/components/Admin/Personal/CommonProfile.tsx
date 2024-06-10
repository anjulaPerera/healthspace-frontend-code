import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";

import UserContext from "../../../context/UserContext";
import { environment } from "../../../environment/environment";

const CommonProfile: React.FC = ({ children }) => {
  const [user] = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [coverImage, setCoverImage] = useState<string | undefined>();

  useEffect(() => {
    if (user?.profilePicture) {
      const baseUrl = environment.api_url;
      const absoluteUrl = `${baseUrl}/${user.profilePicture}`;
      console.log("Absolute URL:", absoluteUrl);
      setProfilePicture(absoluteUrl);
    }
    if (user?.coverImage) {
      const baseUrl = environment.api_url;
      const absoluteUrlC = `${baseUrl}/${user.coverImage}`;
      console.log("Absolute URL:", absoluteUrlC);
      setCoverImage(absoluteUrlC);
    }
  }, []);
  return (
    <>
      <div className="col-md-7 middle-col-feed px-3 d-flex justify-content-center flex-column">
        <div className="w-100 h-auto bg-white feed-component-common rounded-corners">
          <div className="middle-content h-auto w-100 d-flex justify-content-center align-itmes-center profile-details rounded-corners">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column pos-rel">
              <div className="cover-img d-flex justify-content-center align-items-center rounded-corners-top">
                <img
                  src={coverImage}
                  alt=""
                  className="rounded-corners-top w-100 h-100"
                />
              </div>
              <div className="dets w-100 d-flex justify-content-center align-items-center rounded-corners-bottom flex-column">
                <div className="user-name-type d-flex justify-content-start align-items-center w-100">
                  <div className="user-name d-flex justify-content-end align-items-center h-100">
                    <h3>{user?.name}</h3>
                  </div>
                  <div className="user-type d-flex justify-content-start align-items-start h-100">
                    {user?.userType === "DONOR" ? (
                      <h6 className="user-type-indicator-d">Donor</h6>
                    ) : (
                      <h6 className="user-type-indicator-r">Recipient</h6>
                    )}
                  </div>
                </div>
                <h6>{user?.occupation}</h6>
              </div>
              <div className="profile-img">
                {user?.profilePicture && (
                  <img
                    src={profilePicture}
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
