import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../../vendors/styles/healthSpaceStyles.css";
import { RouteName } from "../../../RouteName";

const VerifyEmail: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  // Define state variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("location");
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const verificationToken = searchParams.get("token");

    if (!email || !verificationToken) {
      setError("Invalid verification link.");
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:9000/api/public/verify-email?email=${email}&token=${verificationToken}`
    )
      .then((response) => {
        console.log("response", response);
        if (response.ok) {
          setSuccess(true);
          setTimeout(() => {
            history.push(RouteName.LOGIN);
          }, 3000);
        } else {
          setError("Email verification failed. Please try again.");
        }

        console.log(
          `/api/public/verify-email?email=${email}&token=${verificationToken}`
        );
      })
      .catch((error) => {
        setError("Network error. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  return (
    <>
      <div className="main-container">
        <div className="pd-ltr-20">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {success && (
            <p>Verification successful. Redirecting to login page...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
