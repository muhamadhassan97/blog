import { getPostBySlug, getAllPosts, getAllCategories } from '@/lib/posts'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LikeButton from '@/components/LikeButton'
import Comments from '@/components/Comments'
import EmbedScripts from '@/components/EmbedScripts'
import Sidebar from '@/components/Sidebar'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  const allPosts = getAllPosts()
  const categories = getAllCategories()

  if (!post) {
    notFound()
  }

  // Get related posts (same category or tag)
  const relatedPosts = allPosts
    .filter(p => p.slug !== params.slug && (
      p.category === post.category || 
      p.tags?.some(tag => post.tags?.includes(tag))
    ))
    .slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <article className="lg:col-span-3">
          <EmbedScripts />
          
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-4 mb-4">
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              {post.author && <span>by {post.author}</span>}
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {post.category && (
                <Link 
                  href={`/category/${encodeURIComponent(post.category)}`}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  {post.category}
                </Link>
              )}
              {post.tags && post.tags.length > 0 && post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Like Button Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center">
              <LikeButton postSlug={params.slug} />
            </div>
          </div>

          {/* Comments Section */}
          <Comments postSlug={params.slug} />
        </article>

        {/* Sidebar with related posts */}
        <Sidebar 
          posts={relatedPosts.length > 0 ? relatedPosts : allPosts} 
          categories={categories} 
          showProfile={false}
          showRecentPosts={true}
        />
      </div>
    </div>
  )
}
