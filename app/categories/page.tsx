import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Video,
  FileText,
  Image,
  Bot,
  Code,
  Calculator,
  ShieldCheck,
  Search,
  ArrowRightLeft
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Tool Categories | CreatorTools",
  description: "Browse our complete collection of free online tools for creators, developers, students, and everyday tasks.",
};

const allCategories = [
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
    title: "AI Tools",
    description: "Generate captions, descriptions and creative content.",
    icon: Bot,
    gradientFrom: "from-yellow-400/80",
    gradientTo: "to-orange-500/80",
    href: "/categories/artificial-intelligence",
  },
  {
    title: "Developer Tools",
    description: "Encode, decode, format and analyze code or data.",
    icon: Code,
    gradientFrom: "from-indigo-500/80",
    gradientTo: "to-cyan-400/80",
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
    title: "Calculators",
    description: "Tank volume, BMI, EMI, Unit Price, and plot area calculators.",
    icon: Calculator,
    gradientFrom: "from-emerald-500/80",
    gradientTo: "to-teal-500/80",
    href: "/categories/calculator",
  },
  {
    title: "Converters",
    description: "Convert length, land units, weight, and colors easily.",
    icon: ArrowRightLeft,
    gradientFrom: "from-amber-500/80",
    gradientTo: "to-orange-500/80",
    href: "/categories/converter",
  },
  {
    title: "Security Tools",
    description: "Generate strong passwords, UUIDs, and secure your data.",
    icon: ShieldCheck,
    gradientFrom: "from-slate-500/80",
    gradientTo: "to-gray-500/80",
    href: "/categories/security",
  },
  {
    title: "SEO Tools",
    description: "Word counters, text case converters, and optimization utilities.",
    icon: Search,
    gradientFrom: "from-blue-500/80",
    gradientTo: "to-indigo-500/80",
    href: "/categories/seo",
  }
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-black dark:text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-bold mb-4 text-center text-black dark:text-white">
          All Tool Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto text-center">
          Explore our comprehensive collection of free, zero-compute online tools. Choose a category below to find the exact utility you need.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.title} 
                href={category.href}
                className="flex items-start gap-4 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 p-6 rounded-xl transition-all duration-200 group"
              >
                <div 
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} flex items-center justify-center text-white shadow-sm`}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-black dark:text-white group-hover:text-indigo-500 transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}