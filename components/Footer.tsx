import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-0">

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* LOGO */}
          <div>

            <div className="flex items-center gap-3 mb-3">

              <Image
                src="/logo.png"
                alt="CreatorTools Logo"
                width={100}
                height={33}
                className="rounded-md"
              />

              <div>
                <h3 className="text-white font-semibold">
                  CreatorTools
                </h3>

                <p className="text-xs text-gray-400">
                  .co.in
                </p>

              </div>

            </div>

            <p className="text-sm text-gray-400">
              All-in-one tools platform for creators,
              developers, and productivity.
            </p>

          </div>


          {/* TOOLS */}
          <div>

            <h3 className="text-white font-semibold mb-3">
              Tools
            </h3>

            <ul className="space-y-2 text-gray-400">

              <li>
                <Link href="/categories/creator">Creator Tools</Link>
              </li>

              <li>
                <Link href="/categories/pdf">PDF Tools</Link>
              </li>

              <li>
                <Link href="/categories/image">Image Tools</Link>
              </li>

              <li>
                <Link href="/categories/ai">AI Tools</Link>
              </li>

              <li>
                <Link href="/categories/developer">Developer Tools</Link>
              </li>

            </ul>

          </div>


          {/* RESOURCES */}
          <div>

            <h3 className="text-white font-semibold mb-3">
              Resources
            </h3>

            <ul className="space-y-2 text-gray-400">

              <li>
                <Link href="/about">About</Link>
              </li>

              <li>
                <Link href="/contact">Contact</Link>
              </li>

              <li>
                <Link href="/blog">Blog</Link>
              </li>

            </ul>

          </div>


          {/* LEGAL */}
          <div>

            <h3 className="text-white font-semibold mb-3">
              Legal
            </h3>

            <ul className="space-y-2 text-gray-400">

              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>

              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>

            </ul>

          </div>

        </div>


        {/* COPYRIGHT */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © 2026 CreatorTools.co.in
        </div>

      </div>

    </footer>
  )
}