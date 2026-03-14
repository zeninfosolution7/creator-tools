import Image from "next/image"
import Link from "next/link"
export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

       <Link href="/" className="flex items-center gap-2">

  <Image
    src="/logo.png"
    alt="CreatorTools – Free Online Tools for Creators, PDF, Image and AI Tools"
    width={200}
    height={66}
    className="rounded-md"
  />

</Link>

        <nav className="flex gap-6 text-gray-300">

          <a href="/" className="hover:text-white">
            Home
          </a>

          <a href="/tools" className="hover:text-white">
            Tools
          </a>

          <a href="/privacy-policy" className="hover:text-white">
            Privacy
          </a>
		<a href="/contact" className="hover:text-white">
		  Contact
		</a>
        </nav>

      </div>
    </header>
  );
}