export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 py-20">

      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-5xl font-bold mb-6">
          CreatorTools
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Free online tools for creators, PDFs, images, AI and developers.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/tools/youtube-thumbnail-downloader"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg"
          >
            Try Thumbnail Tool
          </a>

          <a
            href="#tools"
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg"
          >
            Browse Tools
          </a>
        </div>

      </div>

    </main>
  );
}