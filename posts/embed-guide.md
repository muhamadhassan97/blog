---
title: "How to Embed Media in Your Blog Posts"
date: "2024-01-01"
excerpt: "Complete guide to embedding YouTube videos, tweets, Instagram posts, Spotify music, GitHub Gists and more in your blog posts."
author: "Admin"
category: "Guide"
tags: ["tutorial", "embeds", "markdown"]
---

# How to Embed Media in Your Blog Posts

Your blog now supports rich media embeds! Here's how to add different types of content:

## 🎥 YouTube Videos

### Method 1: Paste the full URL
```
https://www.youtube.com/watch?v=VIDEO_ID
```

### Method 2: Use shortcode
```
[youtube:VIDEO_ID]
```

### Method 3: Short URL
```
https://youtu.be/VIDEO_ID
```

## 🐦 Twitter/X Posts

Just paste the tweet URL directly:
```
https://twitter.com/username/status/1234567890
```

Or:
```
https://x.com/username/status/1234567890
```

## 📸 Instagram Posts

Paste the Instagram post URL:
```
https://www.instagram.com/p/POST_ID/
```

## 🎵 Spotify

### For tracks, albums, or playlists:
```
https://open.spotify.com/track/TRACK_ID
https://open.spotify.com/album/ALBUM_ID
https://open.spotify.com/playlist/PLAYLIST_ID
```

### Using shortcode:
```
[spotify:track:TRACK_ID]
[spotify:album:ALBUM_ID]
[spotify:playlist:PLAYLIST_ID]
```

## 💻 GitHub Gists

Paste the Gist URL:
```
https://gist.github.com/username/GIST_ID
```

Or use shortcode:
```
[gist:username/GIST_ID]
```

## 🎨 CodePen

Paste the CodePen URL:
```
https://codepen.io/username/pen/PEN_ID
```

## 🎞️ GIFs

Use the GIF shortcode:
```
[gif:https://media.giphy.com/media/MEDIA_ID/giphy.gif]
```

## 🖼️ Images

Standard markdown syntax:
```
![Alt text](image-url.jpg)
```

Or HTML for more control:
```html
<img src="image-url.jpg" alt="Description" />
```

## 🔗 Regular Links

Links will automatically get enhanced styling with an external link icon:
```
[Link text](https://example.com)
```

## Tips

- **Embeds work in preview mode**: After adding an embed, switch to preview to see how it looks
- **One embed per line**: Give each embed its own line for best results
- **Mix and match**: Combine text, code, images, and embeds in your posts
- **Mobile friendly**: All embeds are responsive and work great on mobile devices

## Example Post

````markdown
# My Awesome Post

Check out this tutorial video:

https://www.youtube.com/watch?v=dQw4w9WgXcQ

Here's the code we'll be using:

```javascript
console.log("Hello world!");
```

And here's a related Spotify playlist to code to:

https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j
````

Happy blogging! 🎉
