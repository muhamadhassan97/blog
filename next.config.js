/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/blog', // Disabled for local development - enable before deploying
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
