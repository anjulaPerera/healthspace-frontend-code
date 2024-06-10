// ListingModal.tsx
import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import DonationEnums from "../../../../Donation";
import { User } from "../../../../models/User";

const { DonationType, BloodType, Condition, Availability } = DonationEnums;

interface ListingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: any) => void;

  user: User | undefined;
}

const ListingModal: React.FC<ListingModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,

  user,
}) => {
  const [activeTab, setActiveTab] = useState<"organ" | "equipment" | "other">(
    "organ"
  );
  const [donationType, setDonationType] = useState<any>(DonationType.ORGAN);

  const handleTabChange = (
    tab: "organ" | "equipment" | "other",
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setActiveTab(tab);
    tab === "organ"
      ? setDonationType(DonationType.ORGAN)
      : tab === "equipment"
      ? setDonationType(DonationType.EQUIPMENT)
      : setDonationType(DonationType.OTHER);
    // Assuming reset is the function to reset the form
  };

  const handleListingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = {
      donationType,
      organDonationSpecifics: activeTab === "organ" ? {} : "N/A",
      equipmentDonationSpecifics: activeTab === "equipment" ? {} : "N/A",
      otherDonationSpecifics: activeTab === "other" ? {} : "N/A",
      userId: user?._id,
    };
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    onSubmit(data);
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSubmit={onSubmit}
      title="Create Listing"
    >
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

      <form onSubmit={handleListingSubmit}>
        {activeTab === "organ" && (
          <>
            {/* Organ Donation Fields */}
            <label>Organ Name</label>
            <input name="organName" />

            <label>Blood Type</label>
            <select name="bloodType">
              {Object.values(BloodType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label>Availability for Donation</label>
            <select name="availabilityForDonation">
              {Object.values(Availability).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label>Healthcare Provider Details</label>
            <input name="healthCareProviderDetails" />

            <label>Other Details</label>
            <input name="otherDetails"></input>
          </>
        )}

        {activeTab === "equipment" && (
          <>
            {/* Equipment Donation Fields */}
            <label>Type of Equipment</label>
            <input name="typeOfEquipment" />

            <label>Condition</label>
            <select name="eqCondition">
              <option value="NEW">New</option>
              <option value="USED">Used</option>
              <option value="REFURBISHED">Refurbished</option>
            </select>

            <label>Model Number</label>
            <input name="modelNumber" />

            <label>Serial Number</label>
            <input name="serialNumber" />

            <label>Manufacturer</label>
            <input name="manufacturer" />

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

            <label>Expiry Date</label>
            <input type="date" name="expiryDate" />

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
      </form>
    </ModalComponent>
  );
};

export default ListingModal;
