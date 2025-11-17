/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled for Vercel deployment - only needed for GitHub Pages static export
  // output: 'export',
  // basePath: '/blog',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
