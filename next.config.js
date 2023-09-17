/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['i.ibb.co', 'pbs.twimg.com'],
  },
};

module.exports = nextConfig;
