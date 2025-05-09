import crypto from "crypto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "N/A";

  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateNextEligibleDate(
  lastDonationDate: Date | null
): Date | null {
  if (!lastDonationDate) return null;

  const date = new Date(lastDonationDate);
  date.setDate(date.getDate() + 56); // 56 days (8 weeks) is the standard waiting period
  return date;
}

export function isEligibleToDonate(nextEligibleDate: Date | null): boolean {
  if (!nextEligibleDate) return true;

  const today = new Date();
  return today >= new Date(nextEligibleDate);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}


const JWT_SECRET = "jwt_secret";
const ENCRYPTION_KEY = "encryption-key-32bytes1234567890"; // 32 bytes for AES-256

function encrypt(text: string) {
  const iv = crypto.randomBytes(16); // Generate new IV for each encryption
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

function decrypt(encrypted: string) {
  const [ivHex, encryptedText] = encrypted.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Generates JWT with encrypted data
export function generateEncryptedToken(data: string) {
  const encryptedData = encrypt(data);
  return jwt.sign({ encryptedData }, JWT_SECRET, { expiresIn: "10m" });
}

// Verifies, decrypts token and compares with original data
export function verifyEncryptedToken(token: string, originalData: string) {
  console.log("Verifying token:", token);
  console.log("Original data:", originalData);
  
  try {
    // Make sure jwt is properly imported
    const decoded = jwt.verify(token, JWT_SECRET);

    // Make sure we're working with an object
    if (typeof decoded !== "object" || decoded === null) {
      return { valid: false, error: "Invalid token format", isMatch: false };
    }

    // Safe access to encryptedData property
    const encryptedData = (decoded as any).encryptedData;
    if (!encryptedData) {
      return {
        valid: false,
        error: "No encrypted data found in token",
        isMatch: false,
      };
    }

    // Decrypt and compare
    const decrypted = decrypt(encryptedData);
    const isMatch = decrypted === originalData;

    return { valid: true, isMatch };
  } catch (err: any) {
    return { valid: false, error: err.message, isMatch: false };
  }
}