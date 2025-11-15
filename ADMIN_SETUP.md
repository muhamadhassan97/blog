# Admin Configuration

## How to Change Admin Password

1. Open `components/AdminAuth.tsx`
2. Find the line with `ADMIN_PASSWORD`
3. Change `'mySecurePassword123'` to your own secure password
4. Save the file

**Example:**
```typescript
const ADMIN_PASSWORD = 'YourNewSecurePassword456'
```

## Security Notes

⚠️ **Important Security Information:**

- This is a **client-side authentication** suitable for personal blogs
- The password is stored in the JavaScript code (visible if someone inspects the source)
- This is fine for a personal blog where you're the only admin
- Authentication persists in localStorage until logout

### For Production Use:

If you need stronger security:
1. Deploy to Vercel/Netlify (not GitHub Pages)
2. Use environment variables
3. Implement server-side authentication
4. Use a database for user management

## How It Works

1. User visits `/admin`
2. Prompted for password
3. Password is checked against `ADMIN_PASSWORD`
4. On success, access is granted and stored in localStorage
5. User stays logged in until they click "Logout"

## Features

- ✅ Password protection for admin panel
- ✅ Beautiful login UI with dark mode support
- ✅ Persistent authentication (localStorage)
- ✅ Logout button visible when authenticated
- ✅ Works with static export (GitHub Pages)
- ✅ Mobile-friendly login screen

## Current Default Password

**Default:** `mySecurePassword123`

🔒 **CHANGE THIS IMMEDIATELY** in `components/AdminAuth.tsx`!
