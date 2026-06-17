import { google } from "googleapis";
import dotenv from "dotenv";

// Load environment variables early
dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CLIENT_SITE_URL } = process.env;

// Validate required env vars
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error("❌ Missing Google OAuth credentials in .env file");
  process.exit(1);
}

/**
 * Creates a new Google OAuth2 client instance.
 * 
 * Redirect URI:
 * - 'postmessage' → used for exchanging one-time codes (mobile/SPA)
 * - `${CLIENT_SITE_URL}/auth/google/callback` → for web-based redirects
 */
export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage" // or `${CLIENT_SITE_URL}/auth/google/callback` for web apps
);

console.log("Google OAuth2 client configured successfully.");
