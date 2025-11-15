import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author?: string
  tags?: string[]
  category?: string
}

export function savePost(postData: PostData): void {
  const { slug, title, date, excerpt, content, author, tags, category } = postData
  
  // Create frontmatter
  let frontmatter = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"`

  if (author) {
    frontmatter += `\nauthor: "${author}"`
  }

  if (category) {
    frontmatter += `\ncategory: "${category}"`
  }

  if (tags && tags.length > 0) {
    frontmatter += `\ntags: [${tags.map(tag => `"${tag}"`).join(', ')}]`
  }

  frontmatter += '\n---\n\n'

  // Combine frontmatter and content
  const fileContent = frontmatter + content

  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  // Write file
  const filePath = path.join(postsDirectory, `${slug}.md`)
  fs.writeFileSync(filePath, fileContent, 'utf8')
}

export function deletePost(slug: string): void {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}
