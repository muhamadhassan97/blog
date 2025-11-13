import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between max-w-6xl">
        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          Tech Blog
        </Link>
        
        <ul className="flex space-x-8">
          <li>
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
