/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY || "https://api-portalreclamo.onrender.com",
    API_URL: process.env.API_URL || "957902342",
  },
};

module.exports = nextConfig;
