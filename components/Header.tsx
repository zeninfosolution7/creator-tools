'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-[70px]">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo-light.png"
              className="block dark:hidden"
              alt="CreatorTools"
              width="180"
              height="60"
            />
            <img
              src="/logo-dark.png"
              className="hidden dark:block"
              alt="CreatorTools"
              width="180"
              height="60"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-slate-200">

            <Link href="/" className="hover:text-black dark:hover:text-white">
              Home
            </Link>
			
			<Link href="/categories" className="hover:text-black dark:hover:text-white">
              Categories
            </Link>

            <Link href="/tools" className="hover:text-black dark:hover:text-white">
              Tools
            </Link>

            <Link href="/privacy-policy" className="hover:text-black dark:hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/contact" className="hover:text-black dark:hover:text-white">
              Contact
            </Link>

            <ThemeToggle />

          </nav>

          {/* MOBILE */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />

            <button
              onClick={() => setOpen(!open)}
              className="text-gray-800 dark:text-white"
            >
              {open ? <X size={26}/> : <Menu size={26}/>}
            </button>
          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-col p-4 space-y-4 text-gray-700 dark:text-slate-200">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/tools" onClick={() => setOpen(false)}>Tools</Link>
            <Link href="/privacy-policy" onClick={() => setOpen(false)}>Privacy Policy</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}

    </header>
  )
}