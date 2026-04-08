import React from "react";
import PressureConverterTool from "@/components/tools/PressureConverterTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pressure Converter | Instantly Convert PSI, Bar, Pascal, Atm",
  description: "Free, instant pressure converter. Convert between Pascal, PSI, Bar, Atmosphere, Torr, and more with our interactive multi-unit tool.",
  alternates: {
    canonical: "https://creatortools.co.in/tools/pressure-converter",
  },
};

export default function PressureConverterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Pressure Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-center">
          Instantly translate pressure measurements across metric, imperial, and scientific scales.
        </p>
      </header>

      <main>
        <PressureConverterTool />
      </main>

      <footer className="mt-16">
        <div className="mt-12 text-sm text-gray-400 text-center">
          pressure converter, convert psi to bar, pascal to atm, kpa to psi, torr to mmhg, atmospheric pressure calculator, metric imperial pressure
        </div>
      </footer>
    </div>
  );
}