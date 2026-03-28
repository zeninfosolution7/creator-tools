'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-0">

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-lg font-semibold">
              CreatorTools
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              All-in-one tools for creators, developers, and productivity.
            </p>
          </div>

          {/* TOOLS */}
          <div>
            <h3 className="font-medium mb-3">
              Tools
            </h3>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/tools">All Tools</Link></li>
              <li><Link href="/categories/ai-tools">AI Tools</Link></li>
              <li><Link href="/categories/pdf-tools">PDF Tools</Link></li>
              <li><Link href="/categories/image-tools">Image Tools</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="font-medium mb-3">
              Resources
            </h3>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-medium mb-3">
              Legal
            </h3>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">

          © {new Date().getFullYear()} CreatorTools.co.in — All rights reserved.

        </div>

      </div>

    </footer>
  )
}