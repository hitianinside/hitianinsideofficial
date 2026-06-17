
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    CLIENT_SITE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    MONGO_DB_URI: string;
    JWT_SECRET: string;
    JWT_TIMEOUT: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;

    NODE_ENV?: "development" | "production";
  }
}