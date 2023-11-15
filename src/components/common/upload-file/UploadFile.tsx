import React, { useState, useContext } from "react";
import { Upload } from "../../../models/Upload";
import { UploadCategory, UploadService } from "../../../services/UploadService";
import UserContext from "../../../context/UserContext";
import userIcon from "../../../components/vendors/images/user.png";

interface UploadFileProps {
  upload?: Upload;
  onUpdate: (file: Upload) => void;
  category: UploadCategory;
}

export const UploadFile: React.FC<UploadFileProps> = ({ upload = undefined, onUpdate, category }) => {
  const [outputFile, setOutputFile] = useState<Upload>(upload as Upload);
  const [user] = useContext(UserContext);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length) {
      const files = e.target.files;
      const upload = await UploadService.upload(files, "company_logo", "file", category);
      if (upload && upload.success) {
        onUpdate(upload.data[0]);
        setOutputFile(upload.data[0]);
      }
    }
  }

  const background = outputFile ? `url("${outputFile.url}")` : user?.photo == undefined ? `${userIcon}` : `url("${(user?.photo as Upload).url}")`;
  return (
    <div className=" upload-file mb-16">
      <div
        style={{
          border: "3px dashed gray",
          width: "152px",
          height: "152px",
          margin: "0 auto",
          borderRadius: "12px",
          paddingTop: "1px",
          background: "lightgray",
        }}
      >
        <div
          id="userActions"
          className="square-144 m-auto px-6 mb-7"
          style={{
            backgroundImage: background,
            backgroundColor: "#efefef",
            height: "100%",
            flexDirection: "column",
            textAlign: "center",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <label
            htmlFor="fileUpload"
            style={{
              backgroundColor: " #318ce7",
              cursor: "pointer",
              background: "#318ce7",
              color: "white !important",
              padding: "14px",
              border: "1px solid white",
              margin: "0",
              top: "-10px",
              right: "-10px",
              position: "absolute",
              borderRadius: "10px",
            }}
            className={"d-flex p-2mb-0 font-size-4 text-smoke"}
          >
            <i className="fa fa-camera fa-1x" aria-hidden="true"></i>
          </label>
          <input type="file" id="fileUpload" className="sr-only " onChange={uploadImage} accept="image/*" />
        </div>
      </div>
    </div>
  );
};
