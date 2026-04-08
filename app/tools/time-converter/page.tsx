import { Metadata } from "next";
import TimeConverterTool from "@/components/tools/TimeConverterTool";

export const metadata: Metadata = {
  title: "Time Converter | Seconds, Minutes, Hours to Days & Years | CreatorTools",
  description: "Free and instant time converter tool. Convert milliseconds, seconds, minutes, hours, days, weeks, months, and years synchronously in real-time.",
  keywords: "time converter, seconds to minutes, hours to days, days to weeks, years to seconds, milliseconds converter",
};

export default function TimeConverterPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-black dark:text-white">
        Time Converter
      </h1>
      <p className="text-black dark:text-gray-200 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
        Instantly convert between any measurement of time. Enter a value into any unit box, and all other time measurements will update in real-time.
      </p>

      {/* Interactive Tool Component */}
      <TimeConverterTool />

      {/* SEO & Content Blueprint */}
      <article className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mt-10 mb-6 text-black dark:text-white">
          What is the Time Converter?
        </h2>
        <p className="text-black dark:text-gray-200 leading-relaxed mb-4">
          The Time Converter is a high-speed, zero-compute utility designed to eliminate the mental math required for calculating durations. Whether you are a programmer needing to convert timestamps from milliseconds to weeks, a freelancer calculating billable hours, or a student doing physics homework, this tool provides real-time conversions across 12 distinct measurements of time simultaneously.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-black dark:text-white">
          How to Use the Time Converter
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-black dark:text-gray-200 mb-8">
          <li><strong>Select a field:</strong> Choose the time unit you currently know (e.g., if you have 5000 seconds, click the "Seconds" input).</li>
          <li><strong>Enter your value:</strong> Type the number. You can use decimals for precise calculations.</li>
          <li><strong>Instant Results:</strong> There is no calculate button. The moment you type, all 11 other input boxes will populate with the exactly equivalent time automatically.</li>
          <li><strong>Edit directly:</strong> You can jump to any other box and start typing to reverse the calculation instantly.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-black dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mb-8">
          <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
            <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-black dark:text-white">
              <span>How are "Months" and "Years" calculated in this tool?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="mt-3 text-black dark:text-gray-200 leading-relaxed">
              Because the number of days in a month or year can vary, this tool uses standardized scientific definitions. A "Year" is defined as a Julian year (365.25 days). A "Month" is defined as 1/12th of a Julian year, which averages exactly 30.4375 days.
            </p>
          </details>

          <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
            <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-black dark:text-white">
              <span>Can I calculate milliseconds and microseconds?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="mt-3 text-black dark:text-gray-200 leading-relaxed">
              Yes! The tool includes deep micro-measurements including nanoseconds, microseconds, and milliseconds, making it highly useful for software engineers and scientists working with system clocks or latency metrics.
            </p>
          </details>

          <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
            <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-black dark:text-white">
              <span>Is my data sent to a server?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="mt-3 text-black dark:text-gray-200 leading-relaxed">
              No. CreatorTools runs entirely on a zero-compute architecture for calculators. All math happens instantly inside your browser, meaning it is 100% private and works immediately.
            </p>
          </details>
        </div>

        <div className="mt-12 text-sm text-black dark:text-gray-400 text-center">
          time converter, seconds to minutes, hours to days, days to weeks, years to seconds, milliseconds converter, nanosecond calculator, real time unit converter
        </div>
      </article>
    </main>
  );
}