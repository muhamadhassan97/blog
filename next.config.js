/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export during development to enable API routes
  // output: 'export',
  // basePath: '/blog',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
