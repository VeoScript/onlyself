/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  env: {
    IMGBB_API_KEY: process.env.IMGBB_API_KEY,
  },
  images: {
    domains: ['i.ibb.co', 'pbs.twimg.com'],
  },
};

module.exports = nextConfig;
