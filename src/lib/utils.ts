import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BLOOD_GROUP_MAP } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBloodGroup(dbValue: string): string {
  return BLOOD_GROUP_MAP[dbValue] || dbValue; // Fallback to the original value if not found
}


