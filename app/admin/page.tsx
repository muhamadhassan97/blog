'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author?: string
  tags?: string[]
}

export default function AdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<Post>({
    slug: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    author: '',
    tags: []
  })
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPost),
      })

      if (response.ok) {
        alert('Post saved successfully!')
        setIsEditing(false)
        setCurrentPost({
          slug: '',
          title: '',
          date: new Date().toISOString().split('T')[0],
          excerpt: '',
          content: '',
          author: '',
          tags: []
        })
        setTagInput('')
        fetchPosts()
        router.refresh()
      } else {
        alert('Error saving post')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post')
    }
  }

  const handleEdit = (post: Post) => {
    setCurrentPost(post)
    setTagInput(post.tags?.join(', ') || '')
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/posts?slug=${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Post deleted successfully!')
        fetchPosts()
        router.refresh()
      } else {
        alert('Error deleting post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentPost({
      slug: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      excerpt: '',
      content: '',
      author: '',
      tags: []
    })
    setTagInput('')
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setCurrentPost({
      ...currentPost,
      title,
      slug: generateSlug(title)
    })
  }

  const handleTagsChange = (value: string) => {
    setTagInput(value)
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag)
    setCurrentPost({ ...currentPost, tags })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Blog Admin</h1>
        <Link 
          href="/"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Editor Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={currentPost.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug (auto-generated)
            </label>
            <input
              type="text"
              required
              value={currentPost.slug}
              onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="post-url-slug"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={currentPost.date}
                onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                value={currentPost.author}
                onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt *
            </label>
            <textarea
              required
              value={currentPost.excerpt}
              onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Brief description of the post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => handleTagsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="javascript, react, tutorial"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content * (Markdown supported)
            </label>
            <textarea
              required
              value={currentPost.content}
              onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              rows={15}
              placeholder="Write your post content in Markdown..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Posts List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Create your first post above!</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                    <p className="text-gray-600 mt-2">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
