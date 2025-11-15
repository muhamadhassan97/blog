// Embed processor for various media types
export function processEmbeds(html: string): string {
  let processed = html

  // YouTube embeds: [youtube:VIDEO_ID] or https://youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID
  processed = processed.replace(
    /\[youtube:([^\]]+)\]/g,
    '<div class="embed-container youtube-embed"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  )
  processed = processed.replace(
    /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g,
    '<div class="embed-container youtube-embed"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  )
  processed = processed.replace(
    /https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/g,
    '<div class="embed-container youtube-embed"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  )

  // Twitter/X embeds: [twitter:TWEET_ID] or full URL
  processed = processed.replace(
    /\[twitter:([^\]]+)\]/g,
    '<div class="embed-container twitter-embed"><blockquote class="twitter-tweet"><a href="https://twitter.com/x/status/$1"></a></blockquote></div>'
  )
  processed = processed.replace(
    /https?:\/\/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/g,
    '<div class="embed-container twitter-embed"><blockquote class="twitter-tweet"><a href="https://twitter.com/x/status/$1"></a></blockquote></div>'
  )

  // Instagram embeds: [instagram:POST_ID] or full URL
  processed = processed.replace(
    /\[instagram:([^\]]+)\]/g,
    '<div class="embed-container instagram-embed"><blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/$1/"></blockquote></div>'
  )
  processed = processed.replace(
    /https?:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)/g,
    '<div class="embed-container instagram-embed"><blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/$1/"></blockquote></div>'
  )

  // TikTok embeds: [tiktok:VIDEO_ID] or full URL
  processed = processed.replace(
    /\[tiktok:([^\]]+)\]/g,
    '<div class="embed-container tiktok-embed"><blockquote class="tiktok-embed" data-video-id="$1"><section></section></blockquote></div>'
  )
  processed = processed.replace(
    /https?:\/\/(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)/g,
    '<div class="embed-container tiktok-embed"><blockquote class="tiktok-embed" data-video-id="$1"><section></section></blockquote></div>'
  )

  // Spotify embeds: [spotify:track:ID] or [spotify:album:ID] or [spotify:playlist:ID] or full URL
  processed = processed.replace(
    /\[spotify:(track|album|playlist|episode|show):([^\]]+)\]/g,
    '<div class="embed-container spotify-embed"><iframe src="https://open.spotify.com/embed/$1/$2" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>'
  )
  processed = processed.replace(
    /https?:\/\/open\.spotify\.com\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/g,
    '<div class="embed-container spotify-embed"><iframe src="https://open.spotify.com/embed/$1/$2" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>'
  )

  // GitHub Gist embeds: [gist:USERNAME/GIST_ID] or full URL
  processed = processed.replace(
    /\[gist:([^\/]+)\/([^\]]+)\]/g,
    '<div class="embed-container gist-embed"><script src="https://gist.github.com/$1/$2.js"></script></div>'
  )
  processed = processed.replace(
    /https?:\/\/gist\.github\.com\/([^\/]+)\/([a-zA-Z0-9]+)/g,
    '<div class="embed-container gist-embed"><script src="https://gist.github.com/$1/$2.js"></script></div>'
  )

  // CodePen embeds: [codepen:USERNAME/PEN_ID] or full URL
  processed = processed.replace(
    /\[codepen:([^\/]+)\/([^\]]+)\]/g,
    '<div class="embed-container codepen-embed"><iframe src="https://codepen.io/$1/embed/$2?default-tab=result" frameborder="0" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe></div>'
  )
  processed = processed.replace(
    /https?:\/\/codepen\.io\/([^\/]+)\/pen\/([a-zA-Z0-9]+)/g,
    '<div class="embed-container codepen-embed"><iframe src="https://codepen.io/$1/embed/$2?default-tab=result" frameborder="0" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe></div>'
  )

  // GIF support (Giphy, Tenor): [gif:URL] or direct URLs
  processed = processed.replace(
    /\[gif:([^\]]+)\]/g,
    '<div class="embed-container gif-embed"><img src="$1" alt="GIF" loading="lazy" /></div>'
  )

  return processed
}

// Generate preview cards for regular links
export function generateLinkPreviews(html: string): string {
  // This is a placeholder - in production you'd want to fetch og:tags from URLs
  // For now, we'll just make links look better
  return html.replace(
    /<a href="(https?:\/\/[^"]+)"([^>]*)>([^<]*)<\/a>/g,
    '<a href="$1"$2 class="link-preview" target="_blank" rel="noopener noreferrer">$3 <span class="link-icon">↗</span></a>'
  )
}
