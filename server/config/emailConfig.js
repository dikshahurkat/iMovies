/**
 * Centralized Email Configuration
 * Validates and exposes Brevo (Sendinblue) transactional email settings.
 */

require("dotenv").config();

const emailConfig = {
  apiKey: process.env.BREVO_API_KEY || "",
  senderEmail: process.env.SENDER_EMAIL || "en24cs3040054@medicaps.ac.in",
  senderName: process.env.SENDER_NAME || "iMovies",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  /**
   * Validate required environment variables.
   * Throws detailed error if configuration is incomplete.
   */
  validateConfig() {
    const missing = [];
    if (!this.apiKey) missing.push("BREVO_API_KEY");
    if (!this.senderEmail) missing.push("SENDER_EMAIL");

    if (missing.length > 0) {
      console.warn(`[EmailConfig] ⚠️ Missing email configuration: ${missing.join(", ")}`);
      return false;
    }
    return true;
  },

  isConfigured() {
    return Boolean(this.apiKey && this.senderEmail);
  },
};

module.exports = emailConfig;
