import React, { useEffect, useState } from "react";
import { PostsService } from "../../../services/PostsService";
import { Listings } from "../../../models/Listings";
import { AdminService } from "../../../services/AdminService";
import { User } from "./../../../models/User";
import ModalComponent from "../../common/ModalComponent";

const ListingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"organ" | "equipment" | "other">(
    "organ"
  );
  const [organListings, setOrganListings] = useState<Listings[]>([]);
  const [equipmentListings, setEquipmentListings] = useState<Listings[]>([]);
  const [otherListings, setOtherListings] = useState<Listings[]>([]);
  const [postOwner, setPostOwner] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        const res = await PostsService.getOrganListings();
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
        const res = await PostsService.getEquipmentListings();
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
        const res = await PostsService.getOtherListings();
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
  }, [activeTab]);
  useEffect(() => {
    document.title = "Listings Management - Admin | CRM";
  }, []);
  const handleTabChangeForListings = (
    tab: "organ" | "equipment" | "other",
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  const handleClickOnDonorDetails = (userId: string) => {
    return async () => {
      try {
        const res = await AdminService.getUserById(userId);
        const user: User = res.data;
        setPostOwner(user);
        setIsModalOpen(true);
      } catch (err) {
        console.log(err);
      }
    };
  };
  const formatDateTime = (dateTimeString: Date) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Use Date.toLocaleString() method to format date and time
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setPostOwner(null);
  };
  return (
    <div className="container mt-2 us-man">
      <h2 className="mb-4">Listings Management</h2>
      <div className="w-100 d-flex justify-content-start align-items-center mb-3">
        <div className="tabs w-100 d-flex justify-content-start align-items-center">
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
      </div>
      <div className="tab-content d-flex flex-column justify-content-center align-items-center w-100">
        <div className="hor-line my-2"></div>
        {activeTab === "organ" && (
          <div className="tab-pane active w-100" id="organ">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Organ Name</th>
                  <th>Blood Type</th>
                  <th>Availability</th>
                  <th>HealthCare Provider</th>
                  <th>Listed At</th>
                  <th>Other Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {organListings.map((listing, index) => (
                  <tr key={index}>
                    <td>{listing.organDonationSpecifics.organName}</td>
                    <td>{listing.organDonationSpecifics.bloodType}</td>
                    <td>
                      {listing.organDonationSpecifics.availabilityForDonation}
                    </td>
                    <td>
                      {listing.organDonationSpecifics.healthCareProviderDetails}
                    </td>
                    <td>{formatDateTime(listing?.listedAt)}</td>
                    <td>{listing.otherDetails}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={handleClickOnDonorDetails(listing?.userId)}
                      >
                        View donor details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "equipment" && (
          <div className="tab-pane active w-100" id="equipment">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Equipment Type</th>
                  <th>Condition</th>
                  <th>Model Number</th>
                  <th>Seriel Number</th>
                  <th>Manufacturer</th>
                  <th>Usage History</th>
                  <th>Listed At</th> <th>Other Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipmentListings.map((listing, index) => (
                  <tr key={index}>
                    <td>
                      {listing?.equipmentDonationSpecifics?.typeOfEquipment}
                    </td>
                    <td>{listing?.equipmentDonationSpecifics?.condition}</td>
                    <td>{listing?.equipmentDonationSpecifics?.modelNumber}</td>
                    <td>{listing?.equipmentDonationSpecifics?.serialNumber}</td>
                    <td>{listing?.equipmentDonationSpecifics?.manufacturer}</td>
                    <td>{listing?.equipmentDonationSpecifics?.usageHistory}</td>
                    <td>{formatDateTime(listing?.listedAt)}</td>
                    <td>{listing.otherDetails}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={handleClickOnDonorDetails(listing?.userId)}
                      >
                        View donor details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "other" && (
          <div className="tab-pane active w-100" id="other">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Donation</th>
                  <th>Quantity</th>
                  <th>Expiration Date</th>
                  <th>Condition</th>
                  <th>Listed At</th>
                  <th>Other Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {otherListings.map((listing, index) => (
                  <tr key={index}>
                    <td>{listing?.otherDonationSpecifics?.typeOfDonation}</td>
                    <td>{listing?.otherDonationSpecifics?.quantity}</td>
                    <td>{listing?.otherDonationSpecifics?.expiryDate}</td>
                    <td>{listing?.otherDonationSpecifics?.condition}</td>
                    <td>{formatDateTime(listing?.listedAt)}</td>
                    <td>{listing?.otherDetails}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={handleClickOnDonorDetails(listing?.userId)}
                      >
                        View donor details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {postOwner && (
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={() => {}}
          title="Donor details"
        >
          <div className="modal-details">
            <div className="m-4 rounded shadow">
              <p className="m-2">
                <strong>Name:</strong> {postOwner.name}
              </p>
              <p className="m-2">
                <strong>Email:</strong> {postOwner.email}
              </p>
              <p className="m-2">
                <strong>Phone:</strong> {postOwner.phone}
              </p>
              <p className="m-2">
                <strong>City:</strong> {postOwner.city}
              </p>
            </div>
            <div className="close-btn" onClick={handleModalClose}>
              X
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default ListingsManagement;
