import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { format } from 'date-fns'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to My Technical Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Sharing insights, tutorials, and thoughts on software development, technology, and more.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Latest Posts</h2>
            <div className="space-y-8">
              {posts.length === 0 ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    No posts yet. Create your first post in the <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">posts/</code> directory!
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0">
                    <Link href={`/posts/${post.slug}`} className="group block">
                      <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{post.excerpt}</p>
                      <div className="flex items-center flex-wrap text-sm text-gray-500 dark:text-gray-400 gap-3">
                        <time dateTime={post.date}>
                          {format(new Date(post.date), 'MMMM d, yyyy')}
                        </time>
                        {post.category && (
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                        )}
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
                ))
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <Sidebar posts={posts} categories={categories} />
      </div>
    </div>
  )
}
