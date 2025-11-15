import Link from 'next/link'
import { Post } from '@/lib/posts'
import { format } from 'date-fns'
import { BookOpen, Tag, User, Calendar } from 'lucide-react'

interface SidebarProps {
  posts?: Post[]
  categories?: string[]
  showProfile?: boolean
  showRecentPosts?: boolean
}

export default function Sidebar({ 
  posts = [], 
  categories = [], 
  showProfile = true,
  showRecentPosts = true 
}: SidebarProps) {
  const recentPosts = posts.slice(0, 5)
  
  // Get all tags from posts
  const allTags = posts.flatMap(post => post.tags || [])
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const popularTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag)

  return (
    <aside className="space-y-6">
      {/* Profile Section */}
      {showProfile && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              MH
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mohamed Hassan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Software Developer</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Sharing insights on software development, web technologies, and programming best practices.
          </p>
          <div className="flex gap-2">
            <a 
              href="https://github.com/muhamadhassan97" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
            >
              GitHub
            </a>
            <a 
              href="/about" 
              className="text-sm bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
            >
              About
            </a>
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Categories</h3>
          </div>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/category/${encodeURIComponent(category)}`}
                  className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all group"
                >
                  <span>{category}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {posts.filter(p => p.category === category).length}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Posts */}
      {showRecentPosts && recentPosts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Posts</h3>
          </div>
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all group"
                >
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <time className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Popular Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter / CTA */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-6 shadow-sm text-white">
        <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
        <p className="text-sm text-blue-50 mb-4">
          Get the latest posts delivered right to your inbox.
        </p>
        <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all">
          Subscribe
        </button>
      </div>

      {/* Archive */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Archive</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              All Posts
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              About Me
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
