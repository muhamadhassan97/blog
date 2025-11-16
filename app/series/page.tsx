import Link from 'next/link'
import { getAllSeries } from '@/lib/series'

export default function SeriesPage() {
  const series = getAllSeries()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Tutorial Series
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Follow along with these structured learning paths
        </p>
      </div>

      {series.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No series available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {series.map((s) => (
            <Link
              key={s.id}
              href={`/series/${s.id}`}
              className="block bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {s.description}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-semibold">
                    {s.totalPosts} {s.totalPosts === 1 ? 'Part' : 'Parts'}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {s.posts.slice(0, 3).map((post, index) => (
                  <div
                    key={post.slug}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold mr-3">
                      {index + 1}
                    </span>
                    <span className="truncate">{post.title}</span>
                  </div>
                ))}
                {s.posts.length > 3 && (
                  <div className="text-sm text-gray-500 dark:text-gray-500 ml-9">
                    + {s.posts.length - 3} more...
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                View Series
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
