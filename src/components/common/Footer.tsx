import React from "react";
import "../vendors/styles/core.css";
import "../vendors/styles/style.css";
import "../vendors/styles/healthSpaceStyles.css";

const Footer: React.FC = () => {
  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="footer-badge d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center ">
          <span>
            <a className="text-white" href="">
              HealthSpace
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
