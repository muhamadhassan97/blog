/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled for local development to enable API routes - enable before deploying
  // basePath: '/blog', // Disabled for local development - enable before deploying
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
