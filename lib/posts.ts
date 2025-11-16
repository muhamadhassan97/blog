import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { processEmbeds, generateLinkPreviews } from './embedProcessor'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author?: string
  tags?: string[]
  category?: string
  series?: string
  seriesOrder?: number
  seriesTitle?: string
  seriesDescription?: string
}

export function getAllPosts(): Post[] {
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || '',
        content: '',
        author: data.author,
        tags: data.tags,
        category: data.category,
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .processSync(content)
    
    let contentHtml = processedContent.toString()
    
    // Process embeds (YouTube, Twitter, Instagram, etc.)
    contentHtml = processEmbeds(contentHtml)
    
    // Enhance regular links with preview styling
    contentHtml = generateLinkPreviews(contentHtml)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      content: contentHtml,
      author: data.author,
      tags: data.tags,
      category: data.category,
    }
  } catch (error) {
    return null
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    if (post.category) {
      categories.add(post.category)
    }
  })
  
  return Array.from(categories).sort()
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.category === category)
}
