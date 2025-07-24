/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.microcms-assets.io'],
  },
};

module.exports = nextConfig;