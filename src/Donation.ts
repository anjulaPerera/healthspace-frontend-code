// enums/Donation.ts
const DonationType = {
  ORGAN: "ORGAN",
  EQUIPMENT: "EQUIPMENT",
  OTHER: "OTHER",
} as const;

const BloodType = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
} as const;

const UrgencyOfNeed = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

const Availability = {
  LIVING: "LIVING",
  POSTHUMOUS: "POSTHUMOUS",
} as const;

const Condition = {
  NEW: "NEW",
  USED: "USED",
  REFURBISHED: "REFURBISHED",
} as const;

const DonationEnums = {
  DonationType,
  BloodType,
  UrgencyOfNeed,
  Availability,
  Condition,
};

export default DonationEnums;
