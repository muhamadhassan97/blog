'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author?: string
  tags?: string[]
  category?: string
}

export default function AdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [showEditor, setShowEditor] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [currentPost, setCurrentPost] = useState<Post>({
    slug: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    author: '',
    tags: [],
    category: ''
  })
  const [tagInput, setTagInput] = useState('')
  const contentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(Array.isArray(data) ? data : data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleSubmit = async () => {
    if (!currentPost.title || !currentPost.content) {
      alert('Please fill in title and content')
      return
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPost),
      })

      if (response.ok) {
        alert('Post published successfully! ✨')
        setShowEditor(false)
        setCurrentPost({
          slug: '',
          title: '',
          date: new Date().toISOString().split('T')[0],
          excerpt: '',
          content: '',
          author: '',
          tags: [],
          category: ''
        })
        setTagInput('')
        fetchPosts()
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  const handleEdit = (post: Post) => {
    setCurrentPost(post)
    setTagInput(post.tags?.join(', ') || '')
    setShowEditor(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure?')) return
    try {
      await fetch(`/api/posts?slug=${slug}`, { method: 'DELETE' })
      fetchPosts()
      router.refresh()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setCurrentPost({ ...currentPost, title, slug: generateSlug(title) })
  }

  const handleTagsChange = (value: string) => {
    setTagInput(value)
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag)
    setCurrentPost({ ...currentPost, tags })
  }

  const insertFormatting = (before: string, after: string, placeholder: string) => {
    const textarea = contentRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = currentPost.content.substring(start, end)
    const textToInsert = selectedText || placeholder
    const newContent = currentPost.content.substring(0, start) + before + textToInsert + after + currentPost.content.substring(end)
    setCurrentPost({ ...currentPost, content: newContent })
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + before.length + textToInsert.length + after.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  const insertLineFormat = (format: string) => {
    const textarea = contentRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const lines = currentPost.content.substring(0, start).split('\n')
    const currentLineStart = start - lines[lines.length - 1].length
    const newContent = currentPost.content.substring(0, currentLineStart) + format + currentPost.content.substring(currentLineStart)
    setCurrentPost({ ...currentPost, content: newContent })
    setTimeout(() => {
      textarea.focus()
      const newPosition = currentLineStart + format.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  if (!showEditor && posts.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stories</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your posts</p>
            </div>
            <button onClick={() => setShowEditor(true)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
              Write a story
            </button>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.slug} className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.date}</span>
                      {post.category && <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">{post.category}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(post)} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Edit</button>
                    <button onClick={() => handleDelete(post.slug)} className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-5xl">
          <button onClick={() => { if (confirm('Discard changes?')) { setShowEditor(false); setCurrentPost({ slug: '', title: '', date: new Date().toISOString().split('T')[0], excerpt: '', content: '', author: '', tags: [], category: '' }) }}} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">← Back</button>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowPreview(!showPreview)} className="px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-sm">{showPreview ? 'Edit' : 'Preview'}</button>
            <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-5 py-1.5 rounded-full text-sm font-medium">Publish</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {!showPreview ? (
          <>
            <input type="text" value={currentPost.title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full text-4xl md:text-5xl lg:text-6xl font-bold mb-6 border-none outline-none bg-transparent dark:text-white leading-tight" placeholder="Title" style={{ fontFamily: 'Georgia, serif' }} />
            <input type="text" value={currentPost.excerpt} onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })} className="w-full text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 border-none outline-none bg-transparent leading-relaxed" placeholder="Subtitle..." style={{ fontFamily: 'Georgia, serif' }} />
            <div className="sticky top-20 z-40 mb-6">
              <div className="inline-flex items-center gap-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg px-2 py-2 border border-gray-200 dark:border-gray-700">
                <button onClick={() => insertLineFormat('# ')} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm font-medium text-gray-700 dark:text-gray-300">H1</button>
                <button onClick={() => insertLineFormat('## ')} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm font-medium text-gray-700 dark:text-gray-300">H2</button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button onClick={() => insertFormatting('**', '**', 'bold')} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm font-bold text-gray-700 dark:text-gray-300">B</button>
                <button onClick={() => insertFormatting('*', '*', 'italic')} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm italic text-gray-700 dark:text-gray-300">I</button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button onClick={() => insertLineFormat('- ')} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300">•</button>
                <button onClick={() => insertLineFormat('1. ')} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300">1.</button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button onClick={() => insertFormatting('```\n', '\n```', 'code')} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm font-mono text-gray-700 dark:text-gray-300">{'</>'}</button>
                <button onClick={() => insertFormatting('`', '`', 'code')} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs font-mono text-gray-700 dark:text-gray-300">code</button>
              </div>
            </div>
            <textarea ref={contentRef} value={currentPost.content} onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })} className="w-full text-xl md:text-2xl border-none outline-none resize-none bg-transparent dark:text-white leading-relaxed" placeholder="Tell your story..." style={{ fontFamily: 'Georgia, serif', lineHeight: '1.8', minHeight: '60vh' }} />
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
                  <span>✨ Story Settings</span>
                  <span className="text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="space-y-5 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Category</label>
                    <input type="text" value={currentPost.category || ''} onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })} className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-gray-300 outline-none bg-transparent dark:text-white" placeholder="JavaScript, Python..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</label>
                    <input type="text" value={tagInput} onChange={(e) => handleTagsChange(e.target.value)} className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-gray-300 outline-none bg-transparent dark:text-white" placeholder="javascript, react..." />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Author</label>
                      <input type="text" value={currentPost.author} onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })} className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 outline-none bg-transparent dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Date</label>
                      <input type="date" value={currentPost.date} onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })} className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 outline-none bg-transparent dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">URL Slug</label>
                    <input type="text" value={currentPost.slug} onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })} className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 outline-none bg-transparent dark:text-white font-mono text-sm" />
                  </div>
                </div>
              </details>
            </div>
          </>
        ) : (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1>{currentPost.title}</h1>
            {currentPost.excerpt && <p className="lead">{currentPost.excerpt}</p>}
            <div className="whitespace-pre-wrap">{currentPost.content}</div>
          </div>
        )}
      </div>
    </div>
  )
}
