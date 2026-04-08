import React from "react";
import TemperatureConverter from "@/components/tools/TemperatureConverterTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temperature Converter | CreatorTools",
  description: "Free online temperature converter. Instantly convert between Celsius, Fahrenheit, Kelvin, Rankine, and more with our real-time calculator.",
};

export default function TemperatureConverterTool() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
          Temperature Converter
        </h1>
        <p className="text-black dark:text-gray-200 max-w-2xl mx-auto">
          Convert temperatures instantly between all major scientific and historical scales including Celsius, Fahrenheit, and Kelvin.
        </p>
      </div>

      <TemperatureConverter />

      <section className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mt-10 mb-6 text-black dark:text-white">
          What is the Temperature Converter?
        </h2>
        <p className="text-black dark:text-gray-200 leading-relaxed mb-4">
          The Temperature Converter is a high-precision tool designed for students, scientists, and engineers who need to translate thermal measurements across different scales. Unlike standard calculators, this tool uses a <strong>synchronous architecture</strong>, meaning you don't have to click "calculate." As you type, every other unit updates immediately.
        </p>
        <p className="text-black dark:text-gray-200 leading-relaxed mb-4">
          This tool supports common scales like Celsius and Fahrenheit, but also specialized scales like Kelvin (used in science), Rankine (used in engineering systems), and historical scales like Newton and Rømer.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-black dark:text-white">
          How to Use
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-black dark:text-gray-200">
          <li>Locate the input field for the temperature scale you currently have.</li>
          <li>Type the numerical value into that field.</li>
          <li>Watch as all other scales—such as Kelvin or Fahrenheit—update automatically.</li>
          <li>For high precision, our tool provides results up to 4 decimal places.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-black dark:text-white">
          Frequently Asked Questions
        </h2>
        
        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-black dark:text-white">
            What is the absolute zero in Celsius?
            <span className="group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p className="mt-3 text-black dark:text-gray-200">
            Absolute zero is -273.15°C. This is the point at which all molecular motion stops. In the Kelvin scale, this is exactly 0K.
          </p>
        </details>

        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-black dark:text-white">
            Why are there so many scales?
            <span className="group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p className="mt-3 text-black dark:text-gray-200">
            While Celsius and Fahrenheit are used for daily weather and cooking, Kelvin and Rankine are "absolute" scales used in thermodynamics to ensure calculations remain positive and consistent with the laws of physics.
          </p>
        </details>

        <div className="mt-12 text-sm text-black dark:text-gray-400 text-center">
          Keywords: temperature converter, celsius to fahrenheit, kelvin calculator, rankine conversion, online temperature tool, science calculator
        </div>
      </section>
    </main>
  );
}