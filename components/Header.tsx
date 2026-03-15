"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {

  const [open, setOpen] = useState(false)

  return (
    <header className="bg-slate-900 border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-[80px]">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
			<img
			  src="/logo.png"
			  alt="CreatorTools"
			  width="200"
			  height="66"
			/>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">

            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/tools" className="hover:text-white">
              Tools
            </Link>

            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>

          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={26}/> : <Menu size={26}/>}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="md:hidden bg-slate-900 border-t border-slate-800">

          <div className="flex flex-col p-4 space-y-4 text-slate-200">

            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/tools" onClick={() => setOpen(false)}>
              Tools
            </Link>

            <Link href="/privacy-policy" onClick={() => setOpen(false)}>
              Privacy Policy
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

          </div>

        </div>

      )}

    </header>
  )
}
