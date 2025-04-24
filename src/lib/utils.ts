import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BLOOD_GROUP_MAP } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBloodGroup(dbValue: string): string {
  return BLOOD_GROUP_MAP[dbValue] || dbValue; // Fallback to the original value if not found
}

export function getBloodGroupKey(value: string): string | undefined {
  // Find the entry where the value matches what we're looking for
  const entry = Object.entries(BLOOD_GROUP_MAP).find(
    ([_, val]) => val === value
  );

  // Return the key if found, otherwise undefined
  return entry ? entry[0] : undefined;
}