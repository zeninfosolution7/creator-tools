"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold text-lg"
          >
            CreatorTools
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">

            <Link href="/">Home</Link>
            <Link href="/categories/artificial-intelligence">AI Tools</Link>
            <Link href="/categories/creator">Creator Tools</Link>
            <Link href="/tools">All Tools</Link>

          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-800">
          <div className="flex flex-col p-4 space-y-3 text-slate-200">

            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link
              href="/categories/artificial-intelligence"
              onClick={() => setOpen(false)}
            >
              AI Tools
            </Link>

            <Link
              href="/categories/creator"
              onClick={() => setOpen(false)}
            >
              Creator Tools
            </Link>

            <Link
              href="/tools"
              onClick={() => setOpen(false)}
            >
              All Tools
            </Link>

          </div>
        </div>
      )}
    </header>
  )
}
