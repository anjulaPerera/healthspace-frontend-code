

export interface Listings {
  _id: string;
  donationType: string;
  organDonationSpecifics: {
    organName: string;
    bloodType: string; //enum
    availabilityForDonation: string; //enum
    healthCareProviderDetails: string;
  };
  equipmentDonationSpecifics?: {
    typeOfEquipment: string; //e.g., ventilators, MRI machines, hospital beds
    condition: string; //enum new, used, refurbished
    modelNumber: string;
    serialNumber: string;
    manufacturer: string;
    usageHistory: string;
  };
  otherDonationSpecifics?: {
    typeOfDonation: string;
    quantity: number;
    expiryDate: Date;
    condition: string; //enum new, used, refurbished
  };

  userId: string;
  otherDetails: string;
  listedAt: Date;
}
