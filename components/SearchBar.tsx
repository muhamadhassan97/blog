'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  excerpt: string
  category?: string
  tags?: string[]
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch all posts when component mounts
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (response.ok) {
          const data = await response.json()
          setAllPosts(data.posts || [])
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    // Close search when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }
    }

    // Handle Ctrl+K or Cmd+K
    const handleSearchShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleSearchShortcut)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleSearchShortcut)
    }
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    const searchQuery = query.toLowerCase()

    const filtered = allPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(searchQuery)
      const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery)
      const categoryMatch = post.category?.toLowerCase().includes(searchQuery)
      const tagsMatch = post.tags?.some(tag => tag.toLowerCase().includes(searchQuery))

      return titleMatch || excerptMatch || categoryMatch || tagsMatch
    })

    setResults(filtered)
    setIsLoading(false)
  }, [query, allPosts])

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, categories, tags..."
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-lg"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results */}
            <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
              {query.trim() === '' ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Start typing to search posts...</p>
                  <p className="text-sm mt-2">Search by title, content, category, or tags</p>
                </div>
              ) : isLoading ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  Searching...
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg mb-2">No results found</p>
                  <p className="text-sm">Try different keywords</p>
                </div>
              ) : (
                <div className="py-2">
                  {results.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      onClick={handleResultClick}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {post.category && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                            {post.category}
                          </span>
                        )}
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center">
                Found {results.length} {results.length === 1 ? 'result' : 'results'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
