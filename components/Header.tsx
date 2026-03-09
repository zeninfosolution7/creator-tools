export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <a href="/" className="text-xl font-bold text-white">
          CreatorTools
        </a>

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