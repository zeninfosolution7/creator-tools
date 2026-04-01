import type { Metadata } from "next";
import TimestampConverterTool from "@/components/tools/TimestampConverterTool";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter | CreatorTools",
  description: "Free, zero-compute Unix timestamp converter. Instantly convert epoch timestamps in seconds or milliseconds to human-readable Local time, UTC, and ISO 8601 dates.",
  alternates: {
    canonical: "https://creatortools.co.in/tools/timestamp-converter",
  },
  openGraph: {
    title: "Unix Timestamp Converter | CreatorTools",
    description: "Instantly convert epoch timestamps to human-readable formats locally in your browser.",
    url: "https://creatortools.co.in/tools/timestamp-converter",
    siteName: "CreatorTools",
    type: "website",
  },
};

export default function TimestampConverterPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Unix Timestamp Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Convert epoch timestamps to human-readable dates instantly. All conversions happen locally in your browser for maximum privacy and zero latency.
          </p>
        </div>

        {/* Load the Client-Side Tool */}
        <TimestampConverterTool />

        {/* SEO Text Content */}
        <article className="mt-16 prose prose-blue dark:prose-invert max-w-none">
          <h2>What is a Unix Timestamp?</h2>
          <p>
            A Unix timestamp (also known as Epoch time) is a way to track time as a running total of seconds. 
            This count starts at the Unix Epoch on <strong>January 1st, 1970 at UTC</strong>. 
            It is widely used in computing, databases, and programming languages because it simplifies time calculations across different time zones.
          </p>
          <h3>Seconds vs. Milliseconds</h3>
          <p>
            Depending on the programming language or system, timestamps are often handled in either seconds or milliseconds. 
            For example, PHP heavily uses seconds, whereas JavaScript's <code>Date.now()</code> returns the timestamp in milliseconds. 
            Our tool allows you to easily toggle between both units.
          </p>
        </article>
      </div>
    </main>
  );
}