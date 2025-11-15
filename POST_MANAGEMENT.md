# Managing Blog Posts

## Understanding How Posts Work

Your blog has two types of posts:

### 1. **Real Posts** (`.md` files in `posts/` folder)
- These are the posts that show on your actual blog
- Located in `/posts/*.md` folder
- Displayed on your website when deployed

### 2. **Draft Posts** (localStorage in admin panel)
- Temporary posts saved in your browser
- Only visible in the admin panel
- **NOT** deployed to your blog

## How to Delete Posts

### Option 1: Delete Real Posts (Recommended)
To delete posts that show on your blog:

```bash
# Delete a specific post
rm posts/post-name.md

# Or manually delete the file in VS Code
```

### Option 2: Admin Panel Delete
The admin panel delete button only removes posts from localStorage (drafts), not the actual `.md` files.

## Workflow for Publishing Posts

### Current Workflow (Manual):
1. Create post in admin panel → Saves to localStorage
2. Copy the markdown content
3. Create a new `.md` file in `posts/` folder
4. Paste content with proper frontmatter
5. Commit and push to GitHub

### Example: Creating a Real Post

Create `posts/my-new-post.md`:
```markdown
---
title: "My New Post"
date: "2025-11-15"
excerpt: "A short description"
author: "Your Name"
category: "JavaScript"
tags: ["react", "nextjs"]
---

# Your Content Here

Write your post content using markdown...
```

## Quick Commands

### List all posts:
```bash
ls -la posts/
```

### Delete a post:
```bash
rm posts/post-name.md
```

### Create a new post:
```bash
touch posts/new-post.md
code posts/new-post.md
```

## Tips

- Use the admin panel for drafting and previewing
- Copy the content to create actual `.md` files for deployment
- Keep your `.md` files organized in the `posts/` folder
- The admin panel is great for local editing, but real posts need `.md` files
