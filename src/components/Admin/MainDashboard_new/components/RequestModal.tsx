// RequestModal.tsx
import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { User } from "../../../../models/User";

interface RequestModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: any) => void; // Modified onSubmit prop

  user: User | undefined;
}

const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,

  user,
}) => {
  const [activeTab, setActiveTab] = useState<"organ" | "equipment" | "other">(
    "organ"
  );

  const handleTabChange = (
    tab: "organ" | "equipment" | "other",
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    setActiveTab(tab);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Gather form data manually
    const formData = new FormData(event.currentTarget);
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    // Pass data to onSubmit function
    onSubmit(data);
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSubmit={onSubmit}
      title="Create Request"
    >
      <>
        <div className="tabs">
          <button
            className={activeTab === "organ" ? "active" : ""}
            onClick={(e) => handleTabChange("organ", e)}
          >
            Organ Donation
          </button>
          <button
            className={activeTab === "equipment" ? "active" : ""}
            onClick={(e) => handleTabChange("equipment", e)}
          >
            Equipment Donation
          </button>
          <button
            className={activeTab === "other" ? "active" : ""}
            onClick={(e) => handleTabChange("other", e)}
          >
            Other Donation
          </button>
        </div>

        {activeTab === "organ" && (
          <>
            {/* Organ Donation Fields */}
            <label>Organ Name</label>
            <input name="organName" />

            <label>Blood Type</label>
            <select name="bloodType">{/* Options for Blood Type */}</select>

            <label>Urgency of Need</label>
            <select name="urgencyOfNeed">
              {/* Options for Urgency of Need */}
            </select>

            <label>Healthcare Provider Details</label>
            <input name="healthCareProviderDetails" />

            <label>Other Details</label>
            <textarea name="otherDetails"></textarea>
          </>
        )}

        {activeTab === "equipment" && (
          <>
            {/* Equipment Donation Fields */}
            <label>Type of Equipment</label>
            <input name="typeOfEquipment" />

            <label>Condition</label>
            <select name="condition">
              <option value="NEW">New</option>
              <option value="USED">Used</option>
              <option value="REFURBISHED">Refurbished</option>
            </select>

            <label>Usage History</label>
            <input name="usageHistory" />

            <label>Other Details</label>
            <textarea name="otherDetails"></textarea>
          </>
        )}

        {activeTab === "other" && (
          <>
            {/* Other Donation Fields */}
            <label>Type of Donation</label>
            <input name="typeOfDonation" />

            <label>Quantity</label>
            <input type="number" name="quantity" />

            <label>Condition</label>
            <select name="condition">
              <option value="NEW">New</option>
              <option value="USED">Used</option>
              <option value="REFURBISHED">Refurbished</option>
            </select>

            <label>Other Details</label>
            <textarea name="otherDetails"></textarea>
          </>
        )}

        <button type="submit">Send Now</button>
      </>
    </ModalComponent>
  );
};

export default RequestModal;
