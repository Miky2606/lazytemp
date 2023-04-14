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
  },
};

module.exports = nextConfig;
