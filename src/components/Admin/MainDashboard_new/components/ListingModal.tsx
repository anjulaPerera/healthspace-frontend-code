// ListingModal.tsx
import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { FieldValues } from "react-hook-form";
import DonationEnums from "../../../../Donation";

const { DonationType, BloodType, Condition, Availability } = DonationEnums;

interface ListingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: FieldValues) => void;
}

const ListingModal: React.FC<ListingModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
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

  return (
    <ModalComponent
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSubmit={onSubmit}
      title="Create Listing"
    >
      {(register, errors) => (
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
              <input {...register("organName")} />

              <label>Blood Type</label>
              <select {...register("bloodType")}>
                {Object.values(BloodType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <label>Availability for Donation</label>
              <select {...register("availabilityForDonation")}>
                {Object.values(Availability).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <label>Healthcare Provider Details</label>
              <input {...register("healthCareProviderDetails")} />

              <label>Other Details</label>
              <textarea {...register("otherDetails")}></textarea>
            </>
          )}

          {activeTab === "equipment" && (
            <>
              {/* Equipment Donation Fields */}
              {/* Add fields for equipment donation here */}
            </>
          )}

          {activeTab === "other" && (
            <>
              {/* Other Donation Fields */}
              {/* Add fields for other donation here */}
            </>
          )}

          <button type="submit">Submit</button>
        </>
      )}
    </ModalComponent>
  );
};

export default ListingModal;
