# Personal Technical Blog

A modern, feature-rich blog built with Next.js, TypeScript, and Tailwind CSS, featuring a Medium-style editor, dark mode, search functionality, and rich media embeds.

## ✨ Features

### Content Management
- 📝 **Medium-style Editor** - Beautiful distraction-free writing experience with rich text toolbar
- 🎨 **Rich Text Formatting** - Headings (H1/H2), Bold, Italic, Lists, Code blocks, Blockquotes
- 📂 **Category System** - Organize posts by topics (C++, JavaScript, Python, etc.)
- 🖼️ **Rich Media Embeds** - YouTube, Twitter/X, Instagram, TikTok, Spotify, GitHub Gists, CodePen, GIFs
- � **Markdown Support** - Write in Markdown with frontmatter for metadata

### User Experience
- � **Dark Mode** - Persistent theme toggle with beautiful dark UI
- 🔍 **Search Functionality** - Fast search with Cmd/Ctrl+K keyboard shortcut
- ❤️ **Like Button** - Readers can like posts (stored locally)
- 💬 **Comments Section** - Simple comment system for engagement
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- ⚡ **Static Site Generation** - Lightning-fast performance

### Developer Experience
- 🎯 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Modern utility-first styling
- 🏗️ **Next.js 14** - Latest App Router features
- 📦 **Easy Deployment** - GitHub Pages or Vercel

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/muhamadhassan97/blog.git
cd blog
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✍️ Creating Blog Posts

### Using the Admin Panel (Local Development)

1. **Disable static export** for local development:
   ```javascript
   // In next.config.js
   const nextConfig = {
     // output: 'export',  // Comment this out
     // basePath: '/blog', // Comment this out
     images: { unoptimized: true },
   }
   ```

2. **Restart the dev server**:
   ```bash
   npm run dev
   ```

3. **Access the admin panel** at [http://localhost:3000/admin](http://localhost:3000/admin)

4. **Create a new post**:
   - Click "Write a story" or the "+" button
   - Write your title and content with the Medium-style editor
   - Use the floating toolbar for formatting (H1/H2, Bold, Italic, Lists, Code, Quotes)
   - Add metadata in "Story Settings" (category, tags, author, date)
   - Click "Preview" to see how it looks
   - Click "Publish" to save

5. **Insert rich media**:
   - YouTube: Paste video URL or use `[youtube:VIDEO_ID]`
   - Twitter: Paste tweet URL
   - Instagram: Paste post URL
   - Spotify: Paste track/album/playlist URL
   - GitHub Gists: Paste gist URL
   - CodePen: Paste pen URL
   - GIFs: Use `![alt text](gif-url.gif)`

6. **Before deploying**, re-enable static export in `next.config.js`:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/blog',
     images: { unoptimized: true },
   }
   ```

### Manual Post Creation

Create a new `.md` file in the `posts/` directory with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-11-15"
excerpt: "A brief description"
author: "Your Name"
category: "JavaScript"
tags: ["react", "nextjs"]
---

Your content with **formatting** and [links](url)...

[youtube:dQw4w9WgXcQ]

\`\`\`javascript
console.log("Code blocks supported!");
\`\`\`
```

## 🎨 Customization

- **Site Title/Metadata**: Edit `app/layout.tsx`
- **Header/Footer**: Edit `components/Header.tsx` and `components/Footer.tsx`
- **Categories**: Add new categories in post frontmatter, they appear automatically
- **Styles**: Modify `app/globals.css` or `tailwind.config.ts`
- **About Page**: Edit `app/about/page.tsx`

## 📁 Project Structure

```
blog/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with ThemeProvider
│   ├── page.tsx                 # Home page with categories sidebar
│   ├── globals.css              # Global styles + embed styling
│   ├── about/                   # About page
│   ├── admin/                   # Admin panel (Medium-style editor)
│   ├── api/posts/               # API routes (POST/DELETE posts)
│   ├── category/[category]/     # Category filter pages
│   └── posts/[slug]/            # Dynamic post pages
├── components/
│   ├── Comments.tsx             # Comments section
│   ├── EmbedScripts.tsx         # External embed scripts loader
│   ├── Footer.tsx               # Footer component
│   ├── Header.tsx               # Header with search and theme toggle
│   ├── LikeButton.tsx           # Like functionality
│   ├── SearchBar.tsx            # Search modal (Cmd/Ctrl+K)
│   ├── ThemeProvider.tsx        # Dark mode context provider
│   └── ThemeToggle.tsx          # Dark mode toggle button
├── lib/
│   ├── embedProcessor.ts        # Process embeds (YouTube, Twitter, etc.)
│   ├── postManager.ts           # Save/delete posts
│   └── posts.ts                 # Read posts from filesystem
├── posts/                       # Blog posts (Markdown files)
│   ├── embed-guide.md          # Guide for using embeds
│   ├── embed-demo.md           # Demo of embed features
│   └── *.md                    # Your blog posts
└── public/                      # Static assets

```

## 🚀 Deployment

### Deploy to GitHub Pages (Current Setup)

The blog is configured for GitHub Pages deployment with GitHub Actions:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

2. **GitHub Actions** automatically builds and deploys to `https://muhamadhassan97.github.io/blog`

3. **Note**: The admin panel won't work on GitHub Pages (API routes require a server). Use it locally to create posts, then push to GitHub.

### Deploy to Vercel (Full Features)

For a fully functional admin panel with API routes:

1. Push your code to GitHub
2. Import on [Vercel](https://vercel.com)
3. Update `next.config.js`:
   ```javascript
   const nextConfig = {
     // Remove output: 'export' and basePath for Vercel
     images: { unoptimized: true },
   }
   ```
4. Deploy - admin panel will work at `your-site.vercel.app/admin`

## 🎯 Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Parse frontmatter
- [Remark](https://github.com/remarkjs/remark) - Markdown processing
- [Remark GFM](https://github.com/remarkjs/remark-gfm) - GitHub Flavored Markdown
- [date-fns](https://date-fns.org/) - Date formatting

## 📚 Documentation

- **Embed Features**: See [EMBED_FEATURES.md](EMBED_FEATURES.md) for complete embed documentation
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md) (if exists) for deployment guide

## 🔧 Development Workflow

### Local Development (with Admin Panel)
```bash
# 1. Disable static export in next.config.js
# 2. Start dev server
npm run dev
# 3. Create posts at http://localhost:3000/admin
# 4. Test at http://localhost:3000
```

### Production Build
```bash
# 1. Enable static export in next.config.js
# 2. Build
npm run build
# 3. Test locally
npx serve@latest out
# 4. Deploy
git push origin main
```

## 💡 Tips

- Use **Cmd/Ctrl+K** to quickly search posts
- Toggle **dark mode** with the moon/sun icon
- **Categories** appear automatically from post frontmatter
- **Embeds** work with just URLs - paste and they render beautifully
- **Admin panel** is local-only on GitHub Pages - use it to create posts, then push

## 📝 License

MIT

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

MIT
