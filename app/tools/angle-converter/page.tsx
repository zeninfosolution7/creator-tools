import { Metadata } from 'next';
import AngleConverterTool from '@/components/tools/AngleConverterTool';

export const metadata: Metadata = {
  title: 'Angle Converter | CreatorTools',
  description: 'Convert degrees to radians, gradians to turns, and more with our instant omni-input calculator.',
};

export default function AngleConverterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Angle Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Type into any field below to instantly convert angular measurements.
        </p>
      </div>

      <AngleConverterTool />

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
          What is the Angle Converter?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Our Angle Converter uses a synchronized multi-input system to translate rotational measurements simultaneously. Whether you are dealing with degrees for standard geometry, radians for higher calculus, or gradians for surveying, every field updates the moment you finish typing.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
          How to Use
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li>Locate the field for the unit you already know (e.g., Radians).</li>
          <li>Enter your numerical value.</li>
          <li>Click outside the box or press <strong>Enter</strong>.</li>
          <li>All other units will instantly populate with the precise converted values.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
          Frequently Asked Questions
        </h2>
        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
            What is the relationship between Degrees and Radians?
            <span className="transition group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            A full circle consists of 360 degrees, which is equivalent to 2π radians. Therefore, 1 radian is equal to 180/π degrees (approximately 57.3°).
          </p>
        </details>
      </section>

      <div className="mt-12 text-sm text-gray-400 text-center">
        degrees, radians, gradians, turns, arcminutes, arcseconds, math calculator, instant converter
      </div>
    </div>
  );
}