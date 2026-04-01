import React from "react";
import { Metadata } from "next";
import ColorConverterTool from "@/components/tools/ColorConverterTool";

export const metadata: Metadata = {
  title: "Color Converter (HEX, RGB, HSL) | CreatorTools",
  description: "Instantly convert colors between HEX, RGB, and HSL formats. A fast, free, and client-side web tool for designers and developers.",
  alternates: {
    canonical: "https://creatortools.co.in/tools/color-converter",
  },
  openGraph: {
    title: "Color Converter (HEX, RGB, HSL) | CreatorTools",
    description: "Instantly convert colors between HEX, RGB, and HSL formats. Fast, free, and completely client-side.",
    url: "https://creatortools.co.in/tools/color-converter",
    siteName: "CreatorTools",
    type: "website",
  },
};

export default function ColorConverterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Color Converter
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Convert your CSS colors instantly between HEX, RGB, and HSL formats. 
            All processing happens securely in your browser.
          </p>
        </div>
        
        {/* Load the Zero-Compute Client Component */}
        <ColorConverterTool />
        
        {/* SEO Text / Instructions Block */}
        <div className="mt-16 prose prose-blue dark:prose-invert mx-auto">
          <h2>How to use the Color Converter</h2>
          <p>
            Whether you are designing a Next.js web application or tailoring Tailwind CSS, this tool makes translating color codes seamless. 
          </p>
          <ul>
            <li><strong>HEX:</strong> Input a standard 3-digit or 6-digit hex code (e.g., <code>#ff0000</code>).</li>
            <li><strong>RGB:</strong> Enter values as a standard CSS string or comma-separated numbers (e.g., <code>rgb(255, 0, 0)</code>).</li>
            <li><strong>HSL:</strong> Utilize Hue, Saturation, and Lightness percentages (e.g., <code>hsl(0, 100%, 50%)</code>).</li>
          </ul>
          <p>
            Simply modify any of the fields above, and the other color formats will automatically generate in real-time. Use the copy button to instantly copy the exact CSS value to your clipboard.
          </p>
        </div>
      </div>
    </div>
  );
}