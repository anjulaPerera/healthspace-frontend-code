import React, { useEffect, useState, useContext } from "react";

import UserContext from "../../../../context/UserContext";

import { AdminService } from "../../../../services/AdminService";
import { User } from "../../../../models/User";
import { environment } from "../../../../environment/environment";

import { useHistory } from "react-router-dom";
import { Listings } from "../../../../models/Listings";
import { PostsService } from "../../../../services/PostsService";
import swal from "sweetalert";

interface SingleListingProps {
  listing: Listings;
}

const SingleListing: React.FC<SingleListingProps> = ({ listing }) => {
  const [user] = useContext(UserContext);
  const [listingOwner, setPostOwner] = useState<User>();
  const [timeElapsedAfterPosting, setTimeElapsedAfterPosting] =
    useState<string>("");
  const [postOwnerProfilePicture, setPostOwnerProfilePicture] =
    useState<string>("");
  const [requestedListing, setRequestedListing] = useState<any>();

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

  const handleRequestClick = (listing: Listings) => {
    console.log("Request Clicked");

    const data = {
      requestedListing: listing,
      requester: user,
      donor: listingOwner,
    };

    try {
      PostsService.sendRequest(data).then((res) => {
        swal({
          title: "Confirmation",
          text: "Are you sure you want to send this request?",
          icon: "warning",
          buttons: ["Cancel", "Send"],
        }).then((confirmed) => {
          if (confirmed) {
            PostsService.sendRequest(data).then((res) => {
              console.log("Request Sent", res);
              swal("Request Sent", "Your request has been sent", "success");
            });
          }
        });
        console.log("Request Sent", res);
      });
    } catch (error) {
      swal("Error", "An error occurred while sending the request", "error");
      console.log("Error in sending request", error);
    }

    console.log("Request Data", data);
  };

  return (
    <div className="middle-content h-auto w-100 py-2 d-flex justify-content-center align-itmes-center px-2 repeating-section-for-posts">
      <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column ">
        <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
          <div className="row w-100 d-flex cursor-pointer">
            <div
              className="col-md-2 remove-right-padding remove-left-padding"
              onClick={handleClickOnUser}
            >
              {" "}
              <img
                src={postOwnerProfilePicture}
                alt=""
                className="search-dp listing"
              />
            </div>
            <div className="col-md-10 remove-left-padding d-flex align-items-start justify-content-between">
              <div className="row w-auto d-flex flex-column ml-2">
                <p className="name-post">{listingOwner?.name}</p>
                <p className="job-post">{listingOwner?.occupation}</p>
                <p className="time-post">{timeElapsedAfterPosting}</p>
              </div>
              <div>
                {user?._id === listingOwner?._id ? null : (
                  <button
                    className="rqst-donation px-2"
                    onClick={() => handleRequestClick(listing)}
                  >
                    Send Request
                  </button>
                )}
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
            <table className="listing-table w-100">
              <tbody>
                <tr>
                  <td className="tpc">Donation Type</td>
                  <td>{listing?.donationType}</td>
                </tr>
                {listing?.organDonationSpecifics?.organName && (
                  <tr>
                    <td className="tpc">Organ Name</td>
                    <td>{listing?.organDonationSpecifics?.organName}</td>
                  </tr>
                )}
                {listing?.organDonationSpecifics?.bloodType && (
                  <tr>
                    <td className="tpc">Blood Type</td>
                    <td>{listing?.organDonationSpecifics?.bloodType}</td>
                  </tr>
                )}
                {listing?.organDonationSpecifics?.availabilityForDonation && (
                  <tr>
                    <td className="tpc">Availability</td>
                    <td>
                      {listing?.organDonationSpecifics?.availabilityForDonation}
                    </td>
                  </tr>
                )}
                {listing?.organDonationSpecifics?.healthCareProviderDetails && (
                  <tr>
                    <td className="tpc">Health Care Provider Details</td>
                    <td>
                      {
                        listing?.organDonationSpecifics
                          ?.healthCareProviderDetails
                      }
                    </td>
                  </tr>
                )}
                {listing?.equipmentDonationSpecifics?.typeOfEquipment && (
                  <tr>
                    <td className="tpc">Type of Equipment</td>
                    <td>
                      {listing?.equipmentDonationSpecifics?.typeOfEquipment}
                    </td>
                  </tr>
                )}
                {listing?.equipmentDonationSpecifics?.condition && (
                  <tr>
                    <td className="tpc">Condition</td>
                    <td>{listing?.equipmentDonationSpecifics?.condition}</td>
                  </tr>
                )}
                {listing?.equipmentDonationSpecifics?.modelNumber && (
                  <tr>
                    <td className="tpc">Model Number</td>
                    <td>{listing?.equipmentDonationSpecifics.modelNumber}</td>
                  </tr>
                )}
                {listing?.equipmentDonationSpecifics?.serialNumber && (
                  <tr>
                    <td className="tpc">Serial Number</td>
                    <td>{listing?.equipmentDonationSpecifics.serialNumber}</td>
                  </tr>
                )}
                {listing?.equipmentDonationSpecifics?.manufacturer && (
                  <tr>
                    <td className="tpc">Manufacturer</td>
                    <td>{listing?.equipmentDonationSpecifics.manufacturer}</td>
                  </tr>
                )}
                {listing?.equipmentDonationSpecifics?.usageHistory && (
                  <tr>
                    <td className="tpc">Usage History</td>
                    <td>{listing?.equipmentDonationSpecifics.usageHistory}</td>
                  </tr>
                )}
                {listing?.otherDonationSpecifics?.typeOfDonation && (
                  <tr>
                    <td className="tpc">Type of Donation</td>
                    <td>{listing?.otherDonationSpecifics.typeOfDonation}</td>
                  </tr>
                )}
                {listing?.otherDonationSpecifics?.quantity && (
                  <tr>
                    <td className="tpc">Quantity</td>
                    <td>{listing?.otherDonationSpecifics.quantity}</td>
                  </tr>
                )}
                {listing?.otherDonationSpecifics?.expiryDate && (
                  <tr>
                    <td className="tpc">Expiry Date</td>
                    <td>{listing?.otherDonationSpecifics.expiryDate}</td>
                  </tr>
                )}
                {listing?.otherDonationSpecifics?.condition && (
                  <tr>
                    <td className="tpc">Condition</td>
                    <td>{listing?.otherDonationSpecifics.condition}</td>
                  </tr>
                )}
                <tr>
                  <td className="tpc">Other Details</td>
                  <td>{listing?.otherDetails}</td>
                </tr>
              </tbody>{" "}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;
