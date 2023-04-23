/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WEATHER_API: process.env.WEATHER_API,
  },
};

module.exports = nextConfig;
