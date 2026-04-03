"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Video, FileText, Image, Bot, Code, Calculator } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import HomeCategoryCard from "@/components/HomeCategoryCard";
import { tools } from "@/lib/tools";

const categories = [
  {
    title: "Creator Tools",
    description: "YouTube thumbnail downloader, hashtag generator and more.",
    icon: Video,
    gradientFrom: "from-purple-500/80",
    gradientTo: "to-indigo-500/80",
    href: "/categories/creator",
  },
  {
    title: "PDF Tools",
    description: "Convert, merge, compress and manage PDF files easily.",
    icon: FileText,
    gradientFrom: "from-red-500/80",
    gradientTo: "to-pink-500/80",
    href: "/categories/pdf",
  },
  {
    title: "Image Tools",
    description: "Resize, compress and edit images instantly.",
    icon: Image,
    gradientFrom: "from-cyan-500/80",
    gradientTo: "to-blue-500/80",
    href: "/categories/image",
  },
  {
    title: "Developer Tools",
    description: "Encode, decode, format and analyze code or data.",
    icon: Code,
    gradientFrom: "from-indigo-500",
    gradientTo: "to-cyan-400",
    href: "/categories/developer",
  },
  {
    title: "Math Tools",
    description: "Age calculator, percentage calculator and other useful math tools.",
    icon: Calculator,
    gradientFrom: "from-teal-500/80",
    gradientTo: "to-green-500/80",
    href: "/categories/math",
  },
  {
    title: "Browse All Categories",
    description: "See All Categories Here",
    icon: Bot,
    gradientFrom: "from-gray-700",
    gradientTo: "to-gray-700",
    href: "/categories",
  },
];

export default function Home() {
  const [heroUrl, setHeroUrl] = useState("");
  const router = useRouter();

  function handleHeroSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!heroUrl) return;

    router.push(
      `/tools/youtube-thumbnail-downloader?url=${encodeURIComponent(heroUrl)}`
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white">

      {/* 🔹 HERO */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          All-in-One Online Tools Platform
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-12">
          Creator tools, PDF utilities, image tools, AI tools and developer tools — all in one place.
        </p>

        <form onSubmit={handleHeroSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">

            <input
              type="text"
              placeholder="Paste YouTube video URL..."
              value={heroUrl}
              onChange={(e) => setHeroUrl(e.target.value)}
              className="input"
            />

            <button type="submit" className="btn-brand">
              Download Thumbnail
            </button>

          </div>
        </form>

      </section>
	  
	  {/* 🔥 Ad Slot */}
<div className="my-8 flex justify-center">
  <div className="w-full max-w-4xl h-[90px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
    Ad Space (Leaderboard)
  </div>
</div>

      {/* 🔹 TOOL CATEGORIES */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Tool Categories
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <HomeCategoryCard
                key={cat.title}
                title={cat.title}
                description={cat.description}
                icon={cat.icon}
                colorFrom={cat.gradientFrom}
                colorTo={cat.gradientTo}
                href={cat.href}
              />
            ))}
          </div>

        </div>
      </section>
	  
	  <div className="my-12 flex justify-center">
  <div className="w-full max-w-3xl h-[250px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
    Ad Space (Medium Rectangle)
  </div>
</div>

      {/* 🔹 POPULAR TOOLS (FIXED BACKGROUND ONLY) */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <CategoryCard {...tool} />
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 🔹 WHY SECTION */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16 text-center">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-12">
            Why Choose CreatorTools
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-3">⚡ Fast Tools</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our tools are optimized for speed so you can complete tasks instantly.
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-3">🔒 Secure</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your files and data are processed securely and never stored permanently.
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-3">🌍 Free to Use</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All tools are free to use with no registration required.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 🔹 CTA (FIXED BACKGROUND + GAP FIXED) */}
      <section className="bg-white dark:bg-gray-800 pt-20 pb-10 text-center">

        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-6">
            Explore All Available Tools
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Discover dozens of powerful utilities designed for creators,
            developers and everyday productivity.
          </p>

          <div className="flex justify-center">
  <Link
    href="/tools"
    className="btn btn-brand px-8 py-4 rounded-xl text-white font-semibold 
               bg-brand-primary hover:bg-brand-primaryHover 
               transition-all shadow-md hover:shadow-lg active:scale-[0.97]"
  >
    Browse All Tools
  </Link>
</div>

        </div>

      </section>

    </main>
  );
}