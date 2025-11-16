'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between max-w-6xl">
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Tech Blog
        </Link>
        
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link 
                href="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/series" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Series
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                About
              </Link>
            </li>
          </ul>
          <SearchBar />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
