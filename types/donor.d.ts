interface Location {
  address: string;
  state: string;
  city: string;
}

interface donation {
  id: string
}

interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  bloodType: string;
  location: Location | null; // Location can be null if not available
  eligibility: boolean;
  nextEligibleDate: string | null; // ISO date string or null
  donations: donation[]; // Adjust type if you have a specific structure for donations
}

// interface User{
//   id: string;
//   firstName: string;
//   lastName: string;
//   bloodType: string;
//   location: Location | null; // Location can be null if not available
//   eligibility: boolean;
//   nextEligibleDate: string | null; // ISO date string or null
//   donations: donation[]; // Adjust type if you have a specific structure for donations
// }