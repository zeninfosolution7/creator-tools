import { Metadata } from "next";
import UuidGeneratorTool from "@/components/tools/UuidGeneratorTool";

export const metadata: Metadata = {
  title: "Free UUID Generator (v4) | CreatorTools",
  description: "Generate completely random, secure UUIDs (v4) instantly in your browser. Bulk generation, uppercase, and hyphen-removal options available. 100% free.",
  alternates: {
    canonical: "https://creatortools.co.in/tools/uuid-generator",
  },
  openGraph: {
    title: "Free UUID Generator (v4) | CreatorTools",
    description: "Generate completely random, secure UUIDs (v4) instantly in your browser.",
    url: "https://creatortools.co.in/tools/uuid-generator",
    siteName: "CreatorTools",
    type: "website",
  },
};

export default function UuidGeneratorPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        
        <header className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Online UUID Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Instantly generate standard universally unique identifiers (UUID version 4). Processing happens entirely in your browser for maximum security and speed.
          </p>
        </header>

        <section aria-label="UUID Generator Tool" className="mb-12">
          <UuidGeneratorTool />
        </section>

        {/* SEO Text Content */}
        <section className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2>What is a UUID?</h2>
          <p>
            A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. 
            The term Globally Unique Identifier (GUID) is also used, particularly in Microsoft ecosystems.
          </p>
          <h3>How secure is version 4?</h3>
          <p>
            Version 4 UUIDs are generated using random or pseudo-random numbers. The chance of generating a collision 
            (two identical UUIDs) is practically zero. Our tool uses the browser's native cryptographic API (<code>crypto.randomUUID()</code>) 
            to ensure true randomness and security.
          </p>
        </section>

      </div>
    </main>
  );
}