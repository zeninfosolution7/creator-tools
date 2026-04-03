import WeightConverterTool from "@/components/tools/WeightConverterTool"

export default function Page() {
  return (
    <div className="px-4 py-10">

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Weight Calculator
      </h1>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center max-w-2xl mx-auto">
        Convert weight instantly between kilograms, grams, pounds, ounces, and more with this simple tool.
      </p>

      {/* TOOL */}
      <div className="card card-padding max-w-3xl mx-auto">
        <WeightConverterTool />
      </div>

      {/* SEO CONTENT */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        What is a Weight Calculator?
      </h2>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        A weight calculator is a tool that helps you convert between different weight units such as kilograms, grams, pounds, ounces, and tonnes. It is useful for daily life, fitness tracking, cooking, and international measurements.
      </p>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        Instead of manually calculating conversions, this tool instantly shows accurate results across all units when you enter a value in any one field.
      </p>

      {/* HOW TO USE */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        How to Use This Tool
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
        <li>Enter weight in any unit</li>
        <li>Click outside the input (blur)</li>
        <li>All units will auto-convert instantly</li>
        <li>Edit any field to recalculate</li>
      </ul>

      {/* FAQ */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        Frequently Asked Questions
      </h2>

      <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
        <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
          Is this weight converter accurate?
        </summary>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Yes, it uses precise conversion factors for accurate results.
        </p>
      </details>

      <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
        <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
          Which units are supported?
        </summary>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Kilogram, gram, milligram, tonne, pound, ounce, and stone.
        </p>
      </details>

      {/* KEYWORDS */}
      <div className="mt-12 text-sm text-gray-400 text-center">
        weight calculator, weight converter, kg to pound, gram converter, unit converter, online weight tool
      </div>

    </div>
  )
}