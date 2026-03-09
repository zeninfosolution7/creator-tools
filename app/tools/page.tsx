export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-12 text-center">
          All Tools
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <a href="/tools/youtube-thumbnail-downloader" className="bg-slate-800 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">
              YouTube Thumbnail Downloader
            </h3>
            <p className="text-gray-400 text-sm">
              Download thumbnails from any YouTube video.
            </p>
          </a>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              PDF to Word Converter
            </h3>
            <p className="text-gray-400 text-sm">
              Convert PDF documents into editable Word files.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              Image Compressor
            </h3>
            <p className="text-gray-400 text-sm">
              Reduce image size without losing quality.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              QR Code Generator
            </h3>
            <p className="text-gray-400 text-sm">
              Create QR codes for links or text.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              Hashtag Generator
            </h3>
            <p className="text-gray-400 text-sm">
              Generate trending hashtags for social media.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              Base64 Encoder
            </h3>
            <p className="text-gray-400 text-sm">
              Encode and decode Base64 strings.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}