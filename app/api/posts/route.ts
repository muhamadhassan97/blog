import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { savePost, deletePost } from '@/lib/postManager'

export async function GET() {
  try {
    const posts = getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()
    savePost(postData)
    return NextResponse.json({ message: 'Post saved successfully' })
  } catch (error) {
    console.error('Error saving post:', error)
    return NextResponse.json({ error: 'Error saving post' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    deletePost(slug)
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 })
  }
}
