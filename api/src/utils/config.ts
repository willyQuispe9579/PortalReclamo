import cnf from "dotenv";
cnf.config();

const config = {
  cloudinary_name: process.env.CLOUD_NAME || "",
  cloudinary_api_key: process.env.CLOUD_API_KEY || "",
  cloudinary_secret: process.env.CLOUD_API_SECRET || "",
  database_connection: process.env.DATABASE_CONNECTION || "",
  NODE_ENV: process.env.NODE_ENV || "",
  email: {
    emailHost: process.env.EMAIL_SMTP || "smtp.gmail.com",
    emailLogin: process.env.EMAIL_LOGIN || "willypruebas6@gmail.com",
    emailPassword: process.env.EMAIL_PASSWORD || "eudmtghkudsatwle",
    emailPort: process.env.EMAIL_PORT || 465,
    emailFrom: process.env.EMAIL_FROM || "PortalReclamo",
    emailSecure: process.env.EMAIL_SECURE === "true",
  },
};

export default config;
