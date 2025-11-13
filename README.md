# Personal Technical Blog

A modern, fast, and SEO-friendly blog built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ Modern and responsive design
- 📝 Markdown-based blog posts
- 🎨 Styled with Tailwind CSS
- ⚡ Built with Next.js 14 (App Router)
- 📱 Mobile-friendly
- 🚀 Static site generation for fast performance
- 📊 SEO optimized

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Creating Blog Posts

1. Create a new `.md` file in the `posts/` directory
2. Add frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief description of your post"
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your content goes here...
```

3. Write your content using Markdown syntax
4. The post will automatically appear on your blog!

## Deployment

### Deploy to GitHub Pages

1. Update `next.config.js` with your repository name if needed
2. Build and export:
```bash
npm run build
```

3. The static files will be in the `out/` directory
4. Push to GitHub and enable GitHub Pages from the repository settings

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy your blog

## Customization

- **Site Title**: Edit `app/layout.tsx`
- **Header/Footer**: Edit `components/Header.tsx` and `components/Footer.tsx`
- **Styles**: Modify `app/globals.css` or Tailwind configuration
- **About Page**: Edit `app/about/page.tsx`

## Project Structure

```
blog/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── about/          # About page
│   └── posts/[slug]/   # Dynamic post pages
├── components/         # React components
├── lib/               # Utility functions
├── posts/             # Blog posts (Markdown)
└── public/            # Static assets
```

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Parse frontmatter
- [Remark](https://github.com/remarkjs/remark) - Markdown processing

## License

MIT
