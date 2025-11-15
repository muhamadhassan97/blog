import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    // Delete the markdown file
    const filePath = join(process.cwd(), 'posts', `${slug}.md`)
    await unlink(filePath)
    
    return NextResponse.json({ 
      success: true, 
      message: `Post ${slug}.md deleted successfully` 
    })
  } catch (error: any) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ 
      error: 'Failed to delete post',
      details: error.message 
    }, { status: 500 })
  }
}
