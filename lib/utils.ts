import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBloodGroup(bloodType: string | null): string {
  if (!bloodType) return ""

  // Handle database format (A_POSITIVE, B_NEGATIVE, etc.)
  if (bloodType.includes("_")) {
    const parts = bloodType.split("_")
    if (parts.length === 2) {
      const group = parts[0]
      const rh = parts[1] === "POSITIVE" ? "+" : "-"
      return `${group}${rh}`
    }
  }

  // Handle URL format (A-POSITIVE, B-NEGATIVE, etc.)
  if (bloodType.includes("-")) {
    const parts = bloodType.split("-")
    if (parts.length === 2) {
      const group = parts[0]
      const rh = parts[1] === "POSITIVE" ? "+" : "-"
      return `${group}${rh}`
    }
  }

  // Already in correct format or unknown format
  return bloodType
}

// export function getBloodGroupKey(bloodGroup: string): string {
//   // Convert from display format (A+, B-) to database/URL format (A-POSITIVE, B-NEGATIVE)
//   if (bloodGroup.length <= 3) {
//     const group = bloodGroup.charAt(0)
//     const rh = bloodGroup.endsWith("+") ? "POSITIVE" : "NEGATIVE"

//     if (bloodGroup.includes("AB")) {
//       return `AB-${rh}`
//     }

//     return `${group}-${rh}`
//   }

//   return bloodGroup
// }

export function formatDate(date: Date | string | null): string {
  if (!date) return "N/A"

  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function calculateNextEligibleDate(lastDonationDate: Date | null): Date | null {
  if (!lastDonationDate) return null

  const date = new Date(lastDonationDate)
  date.setDate(date.getDate() + 56) // 56 days (8 weeks) is the standard waiting period
  return date
}

export function isEligibleToDonate(nextEligibleDate: Date | null): boolean {
  if (!nextEligibleDate) return true

  const today = new Date()
  return today >= new Date(nextEligibleDate)
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

export function generateTempToken(number : number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let token = ""
  for (let i = 0; i < number; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    token += characters[randomIndex]
  }
  return token
}
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "")

  // Format the number as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }

  return phoneNumber // Return the original if it doesn't match the format
}