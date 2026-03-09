export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-28 text-center">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          All-in-One Online Tools Platform
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
          Creator tools, PDF utilities, image tools, AI tools and developer
          tools — all in one place.
        </p>

        {/* TOOL INPUT */}
        <div className="max-w-xl mx-auto flex rounded-lg overflow-hidden shadow-xl border border-slate-700">

  <input
    placeholder="Paste YouTube video URL..."
    className="flex-1 px-4 py-3 bg-white text-black outline-none placeholder-gray-500"
  />

  <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 text-white">
    Get Thumbnail
  </button>

</div>

      </section>
	{/* TOOL CATEGORIES */}

<section id="tools" className="max-w-6xl mx-auto px-6 py-20">

  <h2 className="text-3xl font-bold text-center mb-12">
    Tool Categories
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {/* Creator Tools */}
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">Creator Tools</h3>
      <p className="text-sm opacity-90">
        YouTube thumbnail downloader, hashtag generator and more.
      </p>
    </div>

    {/* PDF Tools */}
    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">PDF Tools</h3>
      <p className="text-sm opacity-90">
        Convert, merge, compress and manage PDF files easily.
      </p>
    </div>

    {/* Image Tools */}
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">Image Tools</h3>
      <p className="text-sm opacity-90">
        Resize, compress and edit images instantly.
      </p>
    </div>

    {/* AI Tools */}
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">AI Tools</h3>
      <p className="text-sm opacity-90">
        Generate captions, descriptions and creative content.
      </p>
    </div>

    {/* Developer Tools */}
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">Developer Tools</h3>
      <p className="text-sm opacity-90">
        Encode, decode, format and analyze code or data.
      </p>
    </div>

  </div>

</section>
    </main>
  );
}