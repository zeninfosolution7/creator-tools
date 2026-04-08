import React from "react";
import SpeedConverterTool from "@/components/tools/SpeedConverterTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speed Converter | Free mph, km/h, knots Calculator",
  description: "Instantly convert speed measurements between miles per hour (mph), kilometers per hour (km/h), knots, meters per second, mach, and the speed of light.",
};

export default function SpeedConverterPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Speed Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Instantly convert velocities between metric, imperial, marine, and scientific speed units.
        </p>
      </div>

      {/* Interactive Tool */}
      <SpeedConverterTool />

      {/* SEO Content Block */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
          What is the Speed Converter?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          The Speed Converter is a fast, zero-compute utility designed to help students, engineers, pilots, and everyday users translate velocity values between different measurement systems. Whether you are reading a European road sign in km/h and need to know the equivalent in mph, or calculating scientific velocities in meters per second (m/s), this tool provides instant, accurate results directly in your browser.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          It supports standard terrestrial speeds, maritime and aviation units (Knots and Mach), and even astronomical constants like the Speed of Light (c).
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
          How to Use the Speed Converter
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>Enter the Value:</strong> Type the numerical speed you wish to convert into the "Value" input box.</li>
          <li><strong>Select Origin Unit:</strong> Choose the unit you are converting <em>from</em> (e.g., Miles per hour).</li>
          <li><strong>Select Target Unit:</strong> Choose the unit you want to convert <em>to</em> (e.g., Kilometers per hour).</li>
          <li><strong>Calculate:</strong> Click the "Convert Speed" button or simply press the <strong>Enter</strong> key on your keyboard to instantly see the result.</li>
        </ul>

        {/* Interactive FAQ */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800 dark:text-gray-100">
          Frequently Asked Questions
        </h2>
        
        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
            <span>What is a Knot?</span>
            <span className="transition group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            A knot is a unit of speed equal to one nautical mile per hour, exactly 1.852 km/h. It is primarily used in maritime and aviation disciplines to measure vessel and aircraft speeds.
          </p>
        </details>

        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
            <span>How fast is Mach 1?</span>
            <span className="transition group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Mach 1 represents the speed of sound. In standard sea-level conditions at 20 degrees Celsius, Mach 1 is approximately 343 meters per second, or roughly 767 miles per hour (1,235 km/h). 
          </p>
        </details>

        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
            <span>Is this tool accurate for scientific calculations?</span>
            <span className="transition group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Yes, the tool uses standard international conversion factors (e.g., 1 mile = 1609.344 meters) to ensure up to 6 decimal places of precision, making it perfectly suitable for physics homework and engineering approximations.
          </p>
        </details>

        {/* SEO Keywords */}
        <div className="mt-12 text-sm text-gray-400 text-center">
          speed converter, mph to kmh, kmh to mph, meters per second, knots to mph, mach speed calculator, feet per second, speed of light, velocity converter, free online speed tools
        </div>
      </div>
    </main>
  );
}