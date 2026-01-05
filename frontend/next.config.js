/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {}, // 👈 REQUIRED to silence error
};

module.exports = nextConfig;
