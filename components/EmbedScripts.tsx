'use client'

import { useEffect } from 'react'

export default function EmbedScripts() {
  useEffect(() => {
    // Twitter/X widget script
    if (!document.querySelector('script[src*="platform.twitter.com"]')) {
      const twitterScript = document.createElement('script')
      twitterScript.src = 'https://platform.twitter.com/widgets.js'
      twitterScript.async = true
      document.body.appendChild(twitterScript)
    }

    // Instagram embed script
    if (!document.querySelector('script[src*="instagram.com/embed"]')) {
      const instagramScript = document.createElement('script')
      instagramScript.src = 'https://www.instagram.com/embed.js'
      instagramScript.async = true
      document.body.appendChild(instagramScript)
    }

    // TikTok embed script
    if (!document.querySelector('script[src*="tiktok.com/embed"]')) {
      const tiktokScript = document.createElement('script')
      tiktokScript.src = 'https://www.tiktok.com/embed.js'
      tiktokScript.async = true
      document.body.appendChild(tiktokScript)
    }
  }, [])

  return null
}
