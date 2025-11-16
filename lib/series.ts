import { getAllPosts } from './posts'

export interface Series {
  id: string
  title: string
  description: string
  posts: any[]
  totalPosts: number
}

export function getAllSeries(): Series[] {
  const allPosts = getAllPosts()
  const seriesMap = new Map<string, any[]>()

  // Group posts by series
  allPosts.forEach(post => {
    if (post.series) {
      if (!seriesMap.has(post.series)) {
        seriesMap.set(post.series, [])
      }
      seriesMap.get(post.series)!.push(post)
    }
  })

  // Convert to Series array
  const series: Series[] = []
  seriesMap.forEach((posts, seriesId) => {
    // Sort posts by seriesOrder if available
    posts.sort((a, b) => {
      const orderA = a.seriesOrder || 0
      const orderB = b.seriesOrder || 0
      return orderA - orderB
    })

    series.push({
      id: seriesId,
      title: posts[0].seriesTitle || seriesId,
      description: posts[0].seriesDescription || `A series of ${posts.length} tutorials`,
      posts,
      totalPosts: posts.length
    })
  })

  return series.sort((a, b) => b.posts[0].date.localeCompare(a.posts[0].date))
}

export function getSeriesById(id: string): Series | null {
  const series = getAllSeries()
  return series.find(s => s.id === id) || null
}
