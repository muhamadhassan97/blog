import Link from 'next/link'
import { getAllCategories, getPostsByCategory, getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import Sidebar from '@/components/Sidebar'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category)
  const posts = getPostsByCategory(category)
  const allPosts = getAllPosts()
  const allCategories = getAllCategories()

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 inline-block">
            ← Back to all posts
          </Link>
          
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            {category}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>

          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0">
                <Link href={`/posts/${post.slug}`} className="group">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar posts={allPosts} categories={allCategories} showProfile={false} />
      </div>
    </div>
  )
}
