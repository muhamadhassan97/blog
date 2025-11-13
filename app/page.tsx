import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Welcome to My Technical Blog
        </h1>
        <p className="text-xl text-gray-600">
          Sharing insights, tutorials, and thoughts on software development, technology, and more.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Latest Posts</h2>
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700">
                No posts yet. Create your first post in the <code className="bg-blue-100 px-2 py-1 rounded">posts/</code> directory!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
                <Link href={`/posts/${post.slug}`} className="group">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </time>
                    {post.tags && (
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 px-2 py-1 rounded text-xs"
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
  )
}
