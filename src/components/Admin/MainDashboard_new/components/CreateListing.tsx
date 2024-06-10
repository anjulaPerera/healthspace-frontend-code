import React, { useEffect, useState, useContext } from "react";
import "../../../vendors/styles/healthSpaceStyles.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../../../context/UserContext";
import { Form, FormFeedback, Input } from "reactstrap";
import { PostsService } from "../../../../services/PostsService";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { environment } from "../../../../environment/environment";
import ListingModal from "./ListingModal";
import RequestModal from "./RequestModal";

const CreateListing: React.FC = () => {
  const [user] = useContext(UserContext);
  const [refreshPage, setRefreshPage] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [coverImage, setCoverImage] = useState<string | undefined>();
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    if (user?.profilePicture) {
      const baseUrl = environment.api_url;
      const absoluteUrl = `${baseUrl}/${user.profilePicture}`;
      console.log("Absolute URL:", absoluteUrl);
      setProfilePicture(absoluteUrl);
    }
  }, []);

  const handleListingSubmit = async (data: any) => {
    console.log("from handleListingSubmit", data);
    setIsListingModalOpen(false);
    const res = await PostsService.sendListing(data);
    console.log("res:::::", res);

    if (res.success) {
      console.log("inside res.success");
      swal({
        title: "Success",
        text: "Listing created successfully",
        icon: "success",
      }).then((value) => {
        // This code runs when the user clicks "OK"
        window.location.reload();
      });
    } else {
      swal({
        title: "Error",
        text: res.error,
        icon: "error",
      });
      console.log("error======||||", res.error);
    }
  };

  const handleRequestSubmit = (data: any) => {
    console.log("from handleREQUESTSubmit", data);
    setIsRequestModalOpen(false);
  };

  return (
    <>
      <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
        <div className="middle-content h-auto w-100 p-2 d-flex justify-content-center align-itmes-center">
          <div className="w-100 d-flex justify-content-center align-itmes-center post-write">
            <div className="row w-100 pr-4 d-flex justify-content-center align-items-center">
              {/* <div className="col-md-2 d-flex justify-content-center align-itmes-center px-0">
                <img src={profilePicture} alt="" className="search-dp" />
              </div> */}
              <button
                className="d-flex justify-content-center align-items-center cursor-p py-1 px-2 post-btn"
                onClick={() => setIsListingModalOpen(true)}
              >
                Create Donation Listing
              </button>
              {/* <button onClick={() => setIsRequestModalOpen(true)}>
                Create Request
              </button> */}

              <ListingModal
                isOpen={isListingModalOpen}
                onRequestClose={() => setIsListingModalOpen(false)}
                onSubmit={handleListingSubmit}
                user={user}
              />

              <RequestModal
                isOpen={isRequestModalOpen}
                onRequestClose={() => setIsRequestModalOpen(false)}
                onSubmit={handleRequestSubmit}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateListing;
