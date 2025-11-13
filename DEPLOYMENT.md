# Deployment Guide

## Deploy to GitHub Pages

1. **Create a GitHub repository** for your blog (e.g., `yourusername.github.io` or any repo name)

2. **Update the base path** if using a project repository (not `username.github.io`):
   
   In `next.config.js`, add:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/your-repo-name', // Only if NOT using username.github.io
     images: {
       unoptimized: true,
     },
   }
   ```

3. **Build the static site**:
   ```bash
   npm run build
   ```

4. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

5. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Go to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
   - Create `.github/workflows/deploy.yml` (see below)

6. **Create GitHub Actions workflow** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with Next.js
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

7. After pushing this workflow, GitHub Actions will automatically build and deploy your blog!

## Deploy to Vercel (Recommended - Easier!)

1. **Push your code to GitHub**

2. **Go to [Vercel](https://vercel.com)** and sign in with GitHub

3. **Import your repository**:
   - Click "Add New Project"
   - Import your blog repository
   - Vercel will auto-detect Next.js settings

4. **Deploy!**:
   - Click "Deploy"
   - Your blog will be live at `your-project.vercel.app`
   - You can add a custom domain later

## Deploy to Netlify

1. **Build the site**:
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=out
   ```

## Custom Domain

For any hosting provider, you can add a custom domain:

1. **GitHub Pages**: Add a `CNAME` file in the `public/` directory with your domain
2. **Vercel**: Go to project settings > Domains
3. **Netlify**: Go to site settings > Domain management

Then configure your DNS provider to point to the hosting service.
