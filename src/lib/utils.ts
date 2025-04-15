import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BLOOD_GROUP_MAP } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBloodGroup(dbValue: string): string {
  return BLOOD_GROUP_MAP[dbValue] || dbValue; // Fallback to the original value if not found
}
export const getReadableLocation = async (latitude : string, longitude:string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();

    // Access the address details
    const address = data.address;
    const city = address.city || address.town || address.village || "";
    const state = address.state || "";
    const country = address.country || "";

    return `${city}, ${state}, ${country}`;
  } catch (error) {
    console.error("Error fetching location:", error);
    return "Unknown location";
  }
};