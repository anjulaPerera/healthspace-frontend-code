import React, { useEffect, useState, useContext } from "react";

import UserContext from "../../../../context/UserContext";

import { AdminService } from "../../../../services/AdminService";
import { User } from "../../../../models/User";
import { environment } from "../../../../environment/environment";

import { useHistory } from "react-router-dom";
import { Listings } from "../../../../models/Listings";

interface SingleListingProps {
  listing: Listings;
}

const SingleListing: React.FC<SingleListingProps> = ({ listing }) => {
  const [listingOwner, setPostOwner] = useState<User>();
  const [timeElapsedAfterPosting, setTimeElapsedAfterPosting] =
    useState<string>("");
  const [postOwnerProfilePicture, setPostOwnerProfilePicture] =
    useState<string>("");

  const [reload, setReload] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    AdminService.getUserById(listing?.userId)
      .then((res) => {
        if (isMounted) {
          console.log(res.data, "is the post owner");
          setPostOwner(res.data);
          if (res.data?.profilePicture) {
            const baseUrl = environment.api_url;
            const absoluteUrl = `${baseUrl}/${res.data.profilePicture}`;
            console.log("Absolute URL:", absoluteUrl);
            setPostOwnerProfilePicture(absoluteUrl);
          }
        }
      })
      .catch((err) => console.log(err));

    const postTimeElapsed = calculateTimeElapsed(listing.listedAt);
    if (isMounted) setTimeElapsedAfterPosting(postTimeElapsed);

    return () => {
      isMounted = false;
    };
  }, [reload]);

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

  const handleClickOnUser = () => {
    console.log("User clicked");
    // window.location.href = `profile/${post?.userId}`;
    history.push(`user-profile/${listing?.userId}`);
  };

  return (
    <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center px-2 repeating-section-for-posts">
      <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column ">
        <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
          <div
            className="row w-100 d-flex cursor-pointer"
            onClick={handleClickOnUser}
          >
            <div className="col-md-2 remove-right-padding remove-left-padding">
              {" "}
              <img src={postOwnerProfilePicture} alt="" className="search-dp" />
            </div>
            <div className="col-md-10 remove-left-padding">
              <div className="row w-auto d-flex flex-column ml-2">
                <p className="name-post">{listingOwner?.name}</p>
                <p className="job-post">{listingOwner?.occupation}</p>
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
            <p className="post-text">{listing?.donationType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;
