'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  postSlug: string
}

export default function LikeButton({ postSlug }: LikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Load likes from localStorage
    const storedLikes = localStorage.getItem(`likes_${postSlug}`)
    const userLiked = localStorage.getItem(`liked_${postSlug}`)
    
    if (storedLikes) {
      setLikes(parseInt(storedLikes, 10))
    }
    if (userLiked === 'true') {
      setHasLiked(true)
    }
  }, [postSlug])

  const handleLike = () => {
    if (hasLiked) {
      // Unlike
      const newLikes = Math.max(0, likes - 1)
      setLikes(newLikes)
      setHasLiked(false)
      localStorage.setItem(`likes_${postSlug}`, newLikes.toString())
      localStorage.setItem(`liked_${postSlug}`, 'false')
    } else {
      // Like
      const newLikes = likes + 1
      setLikes(newLikes)
      setHasLiked(true)
      setIsAnimating(true)
      localStorage.setItem(`likes_${postSlug}`, newLikes.toString())
      localStorage.setItem(`liked_${postSlug}`, 'true')
      
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        hasLiked
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${isAnimating ? 'scale-110' : 'scale-100'}`}
      aria-label={hasLiked ? 'Unlike post' : 'Like post'}
    >
      <Heart
        className={`w-5 h-5 transition-all ${isAnimating ? 'scale-125' : 'scale-100'}`}
        fill={hasLiked ? 'currentColor' : 'none'}
      />
      <span className="font-medium">{likes}</span>
    </button>
  )
}
