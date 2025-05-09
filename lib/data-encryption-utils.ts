/**
 * Data Encryption Utilities
 *
 * A collection of functions for securely encrypting and decrypting
 * sensitive data like emails and phone numbers.
 */

import CryptoJS from "crypto-js";

// Secret key for encryption (store in environment variables)
const SECRET_KEY: string =
  process.env.ENCRYPTION_SECRET_KEY ||
  "your-strong-secret-key-at-least-32-chars";

/**
 * Encrypts an email or phone number
 * @param {string} value - Email or phone number to encrypt
 * @returns {string | null} - Encrypted string (safe to store in database)
 */
export function encrypt(value: string): string | null {
  if (!value) return null;

  // Additional salt to make encryption stronger
  const salt: string = CryptoJS.lib.WordArray.random(128 / 8).toString();

  // Combine the value with salt for added security
  const valueToEncrypt: string = `${salt}:${value}`;

  // Encrypt the value
  const encrypted: string = CryptoJS.AES.encrypt(
    valueToEncrypt,
    SECRET_KEY
  ).toString();

  // Make it URL safe for tokens
  return makeBase64UrlSafe(encrypted);
}

/**
 * Decrypts an email or phone number
 * @param {string} encryptedValue - Previously encrypted string
 * @returns {string | null} - Original email or phone number
 */
export function decrypt(encryptedValue: string): string | null {
  if (!encryptedValue) return null;

  try {
    // Make it standard base64 again
    const standardBase64: string = fromBase64UrlSafe(encryptedValue);

    // Decrypt the value
    const bytes = CryptoJS.AES.decrypt(standardBase64, SECRET_KEY);
    const decrypted: string = bytes.toString(CryptoJS.enc.Utf8);

    // Remove the salt prefix
    const parts: string[] = decrypted.split(":");
    if (parts.length !== 2) {
      throw new Error("Invalid encrypted format");
    }

    return parts[1];
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}

/**
 * Verify if a plaintext value matches an encrypted value
 * @param {string} plaintext - Original value (email/phone)
 * @param {string} encrypted - Encrypted value to check against
 * @returns {boolean} - Whether they match
 */
export function verify(plaintext: string, encrypted: string): boolean {
  if (!plaintext || !encrypted) return false;
  const decrypted: string | null = decrypt(encrypted);
  return plaintext === decrypted;
}

/**
 * Generate a token containing encrypted data
 * @param {string} data - Data to encrypt (email/phone)
 * @param {number} expiryMinutes - Token expiry in minutes
 * @returns {string | null} - Token with encrypted data and expiry
 */
export function generateToken(
  data: string,
  expiryMinutes: number = 10
): string | null {
  if (!data) return null;

  const payload = {
    data,
    expires: Date.now() + expiryMinutes * 60 * 1000,
  };

  // Convert payload to string and encrypt
  return encrypt(JSON.stringify(payload));
}

/**
 * Verify and extract data from token
 * @param {string} token - Token to verify
 * @param {string | null} expectedData - Expected data to compare against (optional)
 * @returns {object} - Result with validation status and data if valid
 */
export function verifyToken(
  token: string,
  expectedData: string | null = null
): { valid: boolean; isMatch?: boolean; data?: string; error?: string } {
  try {
    console.log("Verifying token:", token);
    console.log("Expected data:", expectedData);
    
    // Decrypt token
    const decrypted: string | null = decrypt(token);
    if (!decrypted) {
      return { valid: false, error: "Invalid token format" };
    }

    // Parse payload
    const payload: { data: string; expires: number } = JSON.parse(decrypted);

    // Check expiration
    if (payload.expires < Date.now()) {
      return { valid: false, error: "Token expired" };
    }

    // If expected data provided, compare
    if (expectedData !== null) {
      const isMatch: boolean = payload.data === expectedData;
      return { valid: true, isMatch, data: payload.data };
    }

    return { valid: true, data: payload.data };
  } catch (error: unknown) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Make base64 safe for URLs (replace +, / and =)
 * @private
 */
function makeBase64UrlSafe(str: string): string {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Convert URL-safe base64 back to standard base64
 * @private
 */
function fromBase64UrlSafe(str: string): string {
  // Add padding if needed
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return str;
}
