import React, { useContext, useEffect, useState } from "react";
import "../../../vendors/styles/healthSpaceStyles.css";
import { PostsService } from "../../../../services/PostsService";
import { Listings } from "../../../../models/Listings";
import SingleListing from "./SingleListing";
import UserContext from "../../../../context/UserContext";

const MyListingsComponent: React.FC = () => {
  const [user] = useContext(UserContext);
  const [activeTab, setActiveTab] = useState<"organ" | "equipment" | "other">(
    "organ"
  );
  const [organListings, setOrganListings] = useState<Listings[]>([]);
  const [equipmentListings, setEquipmentListings] = useState<Listings[]>([]);
  const [otherListings, setOtherListings] = useState<Listings[]>([]);

  const handleTabChangeForListings = (
    tab: "organ" | "equipment" | "other",
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchListings = async () => {
      try {
        const res = await PostsService.getAllListings();
        console.log("get all listings res", res);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchOrganListings = async () => {
      try {
        const res = await PostsService.getMyOrganListings(user?._id);
        console.log("get organ listings res", res);

        if (res.data && Array.isArray(res.data) && isMounted) {
          const sortedListings = res.data.sort(
            (a: Listings, b: Listings) =>
              new Date(b?.listedAt || 0).getTime() -
              new Date(a?.listedAt || 0).getTime()
          );
          setOrganListings(sortedListings);
        } else {
          console.error("Invalid data structure received from the server.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchEquipmentListings = async () => {
      try {
        const res = await PostsService.getMyEquipmentListings(user?._id);
        console.log("get equipment listings res", res);

        if (res.data && Array.isArray(res.data) && isMounted) {
          const sortedListings = res.data.sort(
            (a: Listings, b: Listings) =>
              new Date(b?.listedAt || 0).getTime() -
              new Date(a?.listedAt || 0).getTime()
          );
          setEquipmentListings(sortedListings);
        } else {
          console.error("Invalid data structure received from the server.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchOtherListings = async () => {
      try {
        const res = await PostsService.getMyOtherListings(user?._id);
        console.log("get other listings res", res);

        if (res.data && Array.isArray(res.data) && isMounted) {
          const sortedListings = res.data.sort(
            (a: Listings, b: Listings) =>
              new Date(b?.listedAt || 0).getTime() -
              new Date(a?.listedAt || 0).getTime()
          );
          setOtherListings(sortedListings);
        } else {
          console.error("Invalid data structure received from the server.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchListings();

    if (activeTab === "organ") {
      fetchOrganListings();
    } else if (activeTab === "equipment") {
      fetchEquipmentListings();
    } else if (activeTab === "other") {
      fetchOtherListings();
    }

    return () => {
      isMounted = false;
    };
  }, [activeTab, user?._id]);

  return (
    <div className="col-md-3 h-auto right-col-feed px-3 pb-3 d-flex justify-content-center align-items-start">
      <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
        <div className="d-flex align-items-center justify-content-center my-3 fs-18 fw-800">
          My Listings
        </div>

        <div className="tabs w-100 d-flex justify-content-center align-items-center">
          <button
            className={
              activeTab === "organ"
                ? "active mr-1 d-flex justify-content-center align-items-center cursor-p py-1 px-2 post-btn act-btn"
                : "mr-1 d-flex justify-content-center align-items-center cursor-p py-1 px-2 post-btn"
            }
            onClick={(e) => handleTabChangeForListings("organ", e)}
          >
            Organs
          </button>
          <button
            className={
              activeTab === "equipment"
                ? "active mr-1 d-flex justify-content-center align-items-center cursor-p py-1 px-2 post-btn act-btn"
                : "mr-1 d-flex justify-content-center align-items-center cursor-p py-1 px-2 post-btn"
            }
            onClick={(e) => handleTabChangeForListings("equipment", e)}
          >
            Equipments
          </button>
          <button
            className={
              activeTab === "other"
                ? "active d-flex justify-content-center align-items-center cursor-p py-1 px-2 post-btn act-btn"
                : "d-flex justify-content-center align-items-center cursor-p py-1 px-2 post-btn"
            }
            onClick={(e) => handleTabChangeForListings("other", e)}
          >
            Other
          </button>
        </div>

        <div className="tab-content d-flex flex-column justify-content-center align-items-center w-100">
          <div className="hor-line my-2"></div>
          {activeTab === "organ" && (
            <div className="tab-pane active w-100" id="organ">
              <div className="d-flex h-auto w-100 p-1 justify-content-center align-items-center flex-column">
                {organListings.map((listing, index) => (
                  <SingleListing key={index} listing={listing} />
                ))}
              </div>
            </div>
          )}
          {activeTab === "equipment" && (
            <div className="tab-pane active w-100" id="equipment">
              <div className="d-flex h-auto w-100 p-1 justify-content-center align-items-center flex-column">
                {equipmentListings.map((listing, index) => (
                  <SingleListing key={index} listing={listing} />
                ))}
              </div>
            </div>
          )}
          {activeTab === "other" && (
            <div className="tab-pane active w-100" id="other">
              <div className="d-flex h-auto w-100 p-1 justify-content-center align-items-center flex-column">
                {otherListings.map((listing, index) => (
                  <SingleListing key={index} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListingsComponent;
