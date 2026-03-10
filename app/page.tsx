"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Video, FileText, Image, Bot, Code } from "lucide-react";
import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    title: "Creator Tools",
    description: "YouTube thumbnail downloader, hashtag generator and more.",
    icon: Video,
    gradientFrom: "from-purple-500/80",
    gradientTo: "to-indigo-500/80",
  },
  {
    title: "PDF Tools",
    description: "Convert, merge, compress and manage PDF files easily.",
    icon: FileText,
    gradientFrom: "from-red-500/80",
    gradientTo: "to-pink-500/80",
  },
  {
    title: "Image Tools",
    description: "Resize, compress and edit images instantly.",
    icon: Image,
    gradientFrom: "from-cyan-500/80",
    gradientTo: "to-blue-500/80",
  },
  {
    title: "AI Tools",
    description: "Generate captions, descriptions and creative content.",
    icon: Bot,
    gradientFrom: "from-yellow-400/80",
    gradientTo: "to-orange-500/80",
  },
  {
    title: "Developer Tools",
    description: "Encode, decode, format and analyze code or data.",
    icon: Code,
    gradientFrom: "from-green-500/80",
    gradientTo: "to-emerald-600/80",
  },
];

export default function Home() {
  const [heroUrl, setHeroUrl] = useState("");
  const router = useRouter();

  const handleHeroSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = heroUrl.trim();
    if (!trimmed) return;

    router.push(
      `/tools/youtube-thumbnail-downloader?url=${encodeURIComponent(trimmed)}`,
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-14 text-center">

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          All-in-One Online Tools Platform
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
          Creator tools, PDF utilities, image tools, AI tools and developer
          tools — all in one place.
        </p>

        {/* TOOL INPUT */}
        <form
          onSubmit={handleHeroSubmit}
          className="max-w-xl mx-auto flex rounded-lg overflow-hidden shadow-xl border border-slate-700"
        >
          <input
            type="text"
            placeholder="Paste YouTube video URL..."
            value={heroUrl}
            onChange={(e) => setHeroUrl(e.target.value)}
            className="flex-1 px-4 py-3 bg-white text-black outline-none placeholder-gray-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 text-white"
          >
            Download Thumbnail
          </button>
        </form>

      </section>
	{/* TOOL CATEGORIES */}

<section id="tools" className="max-w-6xl mx-auto px-6 py-14">

  <h2 className="text-3xl font-bold text-center mb-12">
    Tool Categories
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
    {categories.map((category) => (
      <CategoryCard key={category.title} {...category} />
    ))}
  </div>

</section>
{/* POPULAR TOOLS */}

<section className="max-w-6xl mx-auto px-6 py-14">

  <h2 className="text-3xl font-bold text-center mb-12">
    Popular Tools
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <Link
      href="/tools/youtube-thumbnail-downloader"
      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
    >
      <div className="bg-slate-800 p-6 rounded-xl shadow hover:scale-105 transition">
        <h3 className="text-xl font-semibold mb-2">
          YouTube Thumbnail Downloader
        </h3>
        <p className="text-gray-400 text-sm">
          Download high quality thumbnails from any YouTube video.
        </p>
      </div>
    </Link>

    <div className="bg-slate-800 p-6 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">
        PDF to Word Converter
      </h3>
      <p className="text-gray-400 text-sm">
        Convert PDF files into editable Word documents.
      </p>
    </div>

    <div className="bg-slate-800 p-6 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">
        Image Compressor
      </h3>
      <p className="text-gray-400 text-sm">
        Reduce image file size without losing quality.
      </p>
    </div>

    <div className="bg-slate-800 p-6 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">
        QR Code Generator
      </h3>
      <p className="text-gray-400 text-sm">
        Generate QR codes instantly for links and text.
      </p>
    </div>

    <div className="bg-slate-800 p-6 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">
        Hashtag Generator
      </h3>
      <p className="text-gray-400 text-sm">
        Generate trending hashtags for social media posts.
      </p>
    </div>

    <div className="bg-slate-800 p-6 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">
        Base64 Encoder
      </h3>
      <p className="text-gray-400 text-sm">
        Encode and decode Base64 text quickly.
      </p>
    </div>

  </div>

</section>
{/* WHY CREATORTOOLS */}

<section className="max-w-6xl mx-auto px-6 py-14 text-center">

  <h2 className="text-3xl font-bold mb-12">
    Why Choose CreatorTools
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="bg-slate-800 p-8 rounded-xl">
      <h3 className="text-xl font-semibold mb-3">
        ⚡ Fast Tools
      </h3>
      <p className="text-gray-400 text-sm">
        Our tools are optimized for speed so you can complete tasks instantly.
      </p>
    </div>

    <div className="bg-slate-800 p-8 rounded-xl">
      <h3 className="text-xl font-semibold mb-3">
        🔒 Secure
      </h3>
      <p className="text-gray-400 text-sm">
        Your files and data are processed securely and never stored permanently.
      </p>
    </div>

    <div className="bg-slate-800 p-8 rounded-xl">
      <h3 className="text-xl font-semibold mb-3">
        🌍 Free to Use
      </h3>
      <p className="text-gray-400 text-sm">
        All tools are free to use with no registration required.
      </p>
    </div>

  </div>

</section>
{/* BROWSE ALL TOOLS */}

<section className="bg-slate-800 py-14">

  <div className="max-w-4xl mx-auto text-center px-6">

    <h2 className="text-3xl font-bold mb-6">
      Explore All Available Tools
    </h2>

    <p className="text-gray-400 mb-10">
      Discover dozens of powerful utilities designed for creators,
      developers and everyday productivity.
    </p>

    <a
      href="/tools"
      className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-lg text-white font-semibold"
    >
      Browse All Tools
    </a>

  </div>

</section>
    </main>
  );
}