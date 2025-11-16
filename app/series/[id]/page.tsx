import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSeriesById, getAllSeries } from '@/lib/series'

export async function generateStaticParams() {
  const series = getAllSeries()
  return series.map((s) => ({
    id: s.id,
  }))
}

export default function SeriesDetailPage({ params }: { params: { id: string } }) {
  const series = getSeriesById(params.id)

  if (!series) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Series Header */}
      <div className="mb-12">
        <Link 
          href="/series"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Series
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 mt-4">
          {series.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {series.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-semibold">
            {series.totalPosts} {series.totalPosts === 1 ? 'Part' : 'Parts'}
          </span>
          <span>Last updated: {new Date(series.posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">Your Progress</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">0 of {series.totalPosts} completed</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {series.posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 group"
          >
            <div className="flex items-start gap-4">
              {/* Part Number */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  {post.author && <span>By {post.author}</span>}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-blue-600 dark:text-blue-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 text-center border border-blue-100 dark:border-blue-800">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ready to start learning?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Begin with Part 1 and work your way through this comprehensive series
        </p>
        <Link
          href={`/posts/${series.posts[0].slug}`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Start Series
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
