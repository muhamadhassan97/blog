/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enabled for GitHub Pages deployment
  basePath: '/blog', // Required for GitHub Pages
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
