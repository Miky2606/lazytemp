/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
  },
  env: {
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    LOCAL_AUTH_URL: process.env.LOCAL_AUTH_URL,
    FIREBASE_KEYS: process.env.FIREBASE_KEYS,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PROJECT_ID: process.env.PROJECT_ID,
    API_URL: process.env.API_URL,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    API_KEY: process.env.API_KEY,
    DB_URL: process.env.DB_URL,
    STORAGE: process.env.STORAGE,
    MESSAGIN: process.env.MESSAGIN,
    APP_ID: process.env.APP_ID,
    MEASUREMEN: process.env.MEASUREMEN,
  },
};

module.exports = nextConfig;
