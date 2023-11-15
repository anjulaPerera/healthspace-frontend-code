import React, { useState } from "react";
import { Upload } from "../../../models/Upload";
import { UploadCategory, UploadService } from "../../../services/UploadService";

interface UploadFilesProps {
  uploads?: Upload[];
  onUpdate: (logo: Upload[]) => void;
  category: UploadCategory;
  title: string;
  users?: string[];
}

export const UploadFiles: React.FC<UploadFilesProps> = ({ uploads = [], onUpdate, category, title, users = [] }) => {
  const [outputFiles, setOutputFiles] = useState<Upload[]>(uploads as Upload[]);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files) {
      const files = e.target.files;
      const upload = await UploadService.upload(files, "company_logo", title, category, users);
      if (upload && upload.success) {
        onUpdate(upload.data);
        setOutputFiles([...outputFiles, ...upload.data]);
      }
    }
  }

  return (
    <div className=" upload-file mb-16 text-center">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {outputFiles.map((u) => {
          const background = `url("${u.url}")`;
          return (
            <div
              key={background}
              style={{
                border: "3px dashed gray",
                width: "152px",
                height: "152px",
                borderRadius: "12px",
                paddingTop: "1px",
                background: "lightgray",
                margin: "4px",
              }}
            >
              <div
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
              ></div>
            </div>
          );
        })}
        <div
          style={{
            border: "3px dashed gray",
            width: "152px",
            height: "152px",
            borderRadius: "12px",
            paddingTop: "1px",
            background: "lightgray",
            margin: "4px",
          }}
        >
          <div
            id="userActions"
            className="square-144 m-auto px-6 mb-7"
            style={{
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
                backgroundColor: "#318ce7",
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
              {" "}
              <i className="fa fa-camera fa-1x" aria-hidden="true"></i>{" "}
            </label>
            <input type="file" id="fileUpload" className="sr-only " onChange={uploadImage} multiple />
          </div>
        </div>
      </div>
    </div>
  );
};
