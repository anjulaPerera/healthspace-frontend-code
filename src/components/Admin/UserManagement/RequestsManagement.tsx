import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/ModalComponent";
import { User } from "../../../models/User";
import { PostsService } from "../../../services/PostsService";
import swal from "sweetalert";

const RequestsManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonorDetailsModalOpen, setIsDonorDetailsModalOpen] = useState(false);
  const [isListingDetailsModalOpen, setIsListingDetailsModalOpen] =
    useState(false);
  const [isRequesterDetailsModalOpen, setIsRequesterDetailsModalOpen] =
    useState(false);
  const [requestedListing, setRequestedListing] = useState<any>();
  const [donorDetails, setDonorDetails] = useState<User>();
  const [requester, setRequester] = useState<User>();
  const [allRequests, setAllRequests] = useState<any>();
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    document.title = "Requests Management - Admin | CRM";
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await PostsService.getAllRequests();
        const requests = res.data;
        console.log("ALL DONATION REQUESTS::::::::::", requests);
        setAllRequests(requests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDonorDetailsModalOpen(false);
    setIsListingDetailsModalOpen(false);
    setIsRequesterDetailsModalOpen(false);
  };

  const hanleRequestDelete = (requestId: any) => async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this request!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await PostsService.deleteRequestByAdmin(requestId);
          if (response.success) {
            swal("Post has been deleted!", {
              icon: "success",
            });
            const updatedRequestsList = allRequests.filter(
              (request: { _id: any }) => request?._id !== requestId
            );
            setAllRequests(updatedRequestsList);
          } else {
            swal("Error", response.message, "error");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        swal("Request is safe!", {
          icon: "info",
        });
      }
    });
  };
  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Use Date.toLocaleString() method to format date and time
  };
    const handleFilterChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setFilter(event.target.value);
    };

    const filteredRequests = allRequests.filter((request: any) => {
      if (filter === "") {
        return true;
      }
      return request?.requestedListing?.donationType === filter;
    });

  return (
    <div className="container mt-2 us-man">
      <h2 className="mb-4">Requests Management</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Requested By</th>
            <th>Lisiting Details</th>
            <th>Donor Details</th>
            <th>Requested At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
     
          {allRequests?.map((request: any, index: number) => {
            return (
              <tr key={index}>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      setRequester(request?.requester);
                      setIsRequesterDetailsModalOpen(true);
                    }}
                  >
                    {request?.requester?.name}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setRequestedListing(request?.requestedListing);
                      setIsListingDetailsModalOpen(true);
                    }}
                  >
                    {request?.requestedListing?.donationType}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => {
                      setDonorDetails(request?.donor);
                      setIsDonorDetailsModalOpen(true);
                    }}
                  >
                    {request?.donor?.name}
                  </button>
                </td>

                <td>{formatDateTime(request?.requestedAt)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={hanleRequestDelete(request?._id)}
                  >
                    Delete Post
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {donorDetails && (
        <ModalComponent
          isOpen={isDonorDetailsModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={() => {}}
          title="Donor Details"
        >
          <div className="modal-details">
            <div className="m-4 rounded shadow">
              <p className="m-2">
                <strong>Name:</strong> {donorDetails?.name}
              </p>
              <p className="m-2">
                <strong>Email:</strong> {donorDetails?.email}
              </p>
              <p className="m-2">
                <strong>Phone:</strong> {donorDetails?.phone}
              </p>
              <p className="m-2">
                <strong>City:</strong> {donorDetails?.city}
              </p>
            </div>
            <div className="close-btn" onClick={handleModalClose}>
              X
            </div>
          </div>
        </ModalComponent>
      )}
      {requester && (
        <ModalComponent
          isOpen={isRequesterDetailsModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={() => {}}
          title="Donor Details"
        >
          <div className="modal-details">
            <div className="m-4 rounded shadow">
              <p className="m-2">
                <strong>Name:</strong> {requester?.name}
              </p>
              <p className="m-2">
                <strong>Email:</strong> {requester?.email}
              </p>
              <p className="m-2">
                <strong>Phone:</strong> {requester?.phone}
              </p>
              <p className="m-2">
                <strong>City:</strong> {requester?.city}
              </p>
            </div>
            <div className="close-btn" onClick={handleModalClose}>
              X
            </div>
          </div>
        </ModalComponent>
      )}
      {requestedListing && (
        <ModalComponent
          isOpen={isListingDetailsModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={() => {}}
          title="Listing Details"
        >
          <div className="modal-details">
            <div className="m-4 rounded shadow">
              <p className="m-2">
                <strong>Donation Type:</strong> {requestedListing?.donationType}
              </p>
              {requestedListing?.organDonationSpecifics && (
                <>
                  <p className="m-2">
                    <strong>Organ Name:</strong>{" "}
                    {requestedListing?.organDonationSpecifics?.organName}
                  </p>
                  <p className="m-2">
                    <strong>Blood Type:</strong>{" "}
                    {requestedListing?.organDonationSpecifics?.bloodType}
                  </p>
                  <p className="m-2">
                    <strong>Availability For Donation:</strong>{" "}
                    {
                      requestedListing?.organDonationSpecifics
                        ?.availabilityForDonation
                    }
                  </p>
                  <p className="m-2">
                    <strong>Health Care Provider Details:</strong>{" "}
                    {
                      requestedListing?.organDonationSpecifics
                        ?.healthCareProviderDetails
                    }
                  </p>
                </>
              )}
              {requestedListing?.equipmentDonationSpecifics && (
                <>
                  <p className="m-2">
                    <strong>Type Of Equipment:</strong>{" "}
                    {
                      requestedListing?.equipmentDonationSpecifics
                        ?.typeOfEquipment
                    }
                  </p>
                  <p className="m-2">
                    <strong>Condition:</strong>{" "}
                    {requestedListing?.equipmentDonationSpecifics?.condition}
                  </p>
                  <p className="m-2">
                    <strong>Model Number:</strong>{" "}
                    {requestedListing?.equipmentDonationSpecifics?.modelNumber}
                  </p>
                  <p className="m-2">
                    <strong>Serial Number:</strong>{" "}
                    {requestedListing?.equipmentDonationSpecifics?.serialNumber}
                  </p>
                  <p className="m-2">
                    <strong>Manufacturer:</strong>{" "}
                    {requestedListing?.equipmentDonationSpecifics?.manufacturer}
                  </p>
                  <p className="m-2">
                    <strong>Usage History:</strong>{" "}
                    {requestedListing?.equipmentDonationSpecifics?.usageHistory}
                  </p>
                </>
              )}
              {requestedListing?.otherDonationSpecifics && (
                <>
                  <p className="m-2">
                    <strong>Type Of Donation:</strong>{" "}
                    {requestedListing?.otherDonationSpecifics?.typeOfDonation}
                  </p>
                  <p className="m-2">
                    <strong>Quantity:</strong>{" "}
                    {requestedListing?.otherDonationSpecifics?.quantity}
                  </p>
                  <p className="m-2">
                    <strong>Expiry Date:</strong>{" "}
                    {requestedListing?.otherDonationSpecifics?.expiryDate}
                  </p>
                  <p className="m-2">
                    <strong>Condition:</strong>{" "}
                    {requestedListing?.otherDonationSpecifics?.condition}
                  </p>
                </>
              )}
              <p className="m-2">
                <strong>Listing created At:</strong>{" "}
                {formatDateTime(requestedListing?.listedAt)}
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

export default RequestsManagement;
