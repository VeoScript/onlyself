/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['i.ibb.co', 'pbs.twimg.com'],
  },
};

module.exports = nextConfig;
