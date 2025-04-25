// Areas/divisions in Bangladesh
export const AREAS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

// Blood groups
export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Mapping of database blood group values to display values
export const BLOOD_GROUP_MAP: Record<string, string> = {
  "A-POSITIVE": "A+",
  "A-NEGATIVE": "A-",
  "B-POSITIVE": "B+",
  "B-NEGATIVE": "B-",
  "AB-POSITIVE": "AB+",
  "AB-NEGATIVE": "AB-",
  "O-POSITIVE": "O+",
  "O-NEGATIVE": "O-",
};
export const ITEM_PER_PAGE = 12; // Number of items per page for pagination
// Define a custom Location type
export type CustomLocation = {
  city: string;
  upazila: string;
  address: string;
};

export const DEFAULT_LOCATION: CustomLocation = {
  city: "Unknown",
  upazila: "Unknown",
  address: "Unknown",
};