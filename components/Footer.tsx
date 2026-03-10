export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 py-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">
            CreatorTools
          </h3>
          <p className="text-sm">
            All-in-one tools platform for creators, developers, and productivity.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Tools</h4>
          <ul className="space-y-2 text-sm">
            <li>Creator Tools</li>
            <li>PDF Tools</li>
            <li>Image Tools</li>
            <li>AI Tools</li>
            <li>Developer Tools</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Contact</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} CreatorTools.co.in
      </div>
    </footer>
  );
}