import React, { useEffect, useState, useContext } from "react";
import "../../../vendors/styles/healthSpaceStyles.css";
import { PostsService } from "../../../../services/PostsService";
import { Listings } from "../../../../models/Listings";

const ListingsComponent: React.FC = () => {
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
    try {
      PostsService.getAllListings()
        .then((res) => {
          console.log("get all listings res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }

    try {
      PostsService.getOrganListings()
        .then((res) => {
          console.log("get organ listings res", res);

          if (res.data) {
            console.log("posts", res.data);
            const allPosts: any = res.data;
            const sortedPosts = [...allPosts].sort(
              (a: Listings, b: Listings) => {
                const dateA = new Date(a?.listedAt || 0).getTime();
                const dateB = new Date(b?.listedAt || 0).getTime();
                return dateB - dateA;
              }
            );

            setOrganListings(sortedPosts);
            console.log("sorted organ posts", sortedPosts);
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
    try {
      PostsService.getEquipmentListings()
        .then((res) => {
          console.log("get organ listings res", res);

          if (res.data) {
            console.log("posts", res.data);
            const allPosts: any = res.data;
            const sortedPosts = [...allPosts].sort(
              (a: Listings, b: Listings) => {
                const dateA = new Date(a?.listedAt || 0).getTime();
                const dateB = new Date(b?.listedAt || 0).getTime();
                return dateB - dateA;
              }
            );

            setEquipmentListings(sortedPosts);
            console.log("sorted equipment posts", sortedPosts);
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
    try {
      PostsService.getOtherListings()
        .then((res) => {
          console.log("get organ listings res", res);

          if (res.data) {
            console.log("posts", res.data);
            const allPosts: any = res.data;
            const sortedPosts = [...allPosts].sort(
              (a: Listings, b: Listings) => {
                const dateA = new Date(a?.listedAt || 0).getTime();
                const dateB = new Date(b?.listedAt || 0).getTime();
                return dateB - dateA;
              }
            );

            setOtherListings(sortedPosts);
            console.log("sorted other posts", sortedPosts);
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
  }, [activeTab]);

  return (
    <>
      <div className="col-md-3 h-auto right-col-feed px-3 pb-3 d-flex justify-content-center align-items-start">
        <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
          <div className="d-flex align-items-center justify-content-center my-3 fs-18 fw-800">
            Listings by Donors
          </div>

          <div className="tabs w-100 d-flex justify-content-center align-items-center">
            {/* <p>active tab {activeTab}</p> */}
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
              <div className="tab-pane active" id="organ">
                <div className="d-flex h-auto w-100 p-1 justify-content-center align-items-center">
                  ela
                </div>
              </div>
            )}
            {activeTab === "equipment" && (
              <div className="tab-pane active" id="equipment">
                <p>Eq</p>
              </div>
            )}
            {activeTab === "other" && (
              <div className="tab-pane active" id="other">
                <p>Other</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingsComponent;
