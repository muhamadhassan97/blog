/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enabled for GitHub Pages deployment
  // basePath: '/blog', // Disabled for local development - enable before deploying
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
