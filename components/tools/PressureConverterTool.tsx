"use client";

import React, { useState } from "react";

// Base Unit: Pascal (Pa)
const PRESSURE_UNITS = [
  { id: "pa", label: "Pascal (Pa)", factor: 1 },
  { id: "kpa", label: "Kilopascal (kPa)", factor: 1000 },
  { id: "mpa", label: "Megapascal (MPa)", factor: 1000000 },
  { id: "bar", label: "Bar", factor: 100000 },
  { id: "mbar", label: "Millibar (mbar)", factor: 100 },
  { id: "atm", label: "Standard Atmosphere (atm)", factor: 101325 },
  { id: "psi", label: "Pound-force per sq inch (PSI)", factor: 6894.7572932 },
  { id: "psf", label: "Pound-force per sq foot (PSF)", factor: 47.88025898 },
  { id: "torr", label: "Torr", factor: 133.322368 },
  { id: "mmhg", label: "Millimeter of mercury (mmHg)", factor: 133.322387415 },
  { id: "inhg", label: "Inch of mercury (inHg)", factor: 3386.389 },
  { id: "inh2o", label: "Inch of water (inH2O)", factor: 249.082 },
  { id: "kgcm2", label: "Kilogram per sq cm (kg/cm²)", factor: 98066.5 },
];

export default function PressureConverterTool() {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleInputChange = (unitId: string, value: string) => {
    // Allow empty inputs and minus sign temporarily
    if (value === "" || value === "-") {
      setValues((prev) => ({ ...prev, [unitId]: value }));
      if (value === "") setValues({});
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setValues((prev) => ({ ...prev, [unitId]: value }));
      return;
    }

    const activeUnit = PRESSURE_UNITS.find((u) => u.id === unitId);
    if (!activeUnit) return;

    // Convert input to Base Unit (Pascal)
    const baseValue = numValue * activeUnit.factor;
    const newValues: Record<string, string> = {};

    // Sync all units based on the Pascal base value
    PRESSURE_UNITS.forEach((unit) => {
      if (unit.id === unitId) {
        newValues[unit.id] = value;
      } else {
        const converted = baseValue / unit.factor;
        // Format to prevent excessive decimal lengths, dropping trailing zeros
        newValues[unit.id] = Number.isInteger(converted) 
          ? converted.toString() 
          : parseFloat(converted.toFixed(6)).toString();
      }
    });

    setValues(newValues);
  };

  const handleClear = () => setValues({});

  return (
    <div className="w-full">
      <div className="card card-padding max-w-3xl mx-auto">
        {/* Ad Placement */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-3xl h-[90px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg text-gray-500 text-sm">
            Ad Space (Leaderboard)
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">
          Instead of manually calculating conversions, this tool instantly shows accurate results across all units when you enter a value in any one field.
        </p>

        <div className="space-y-4">
          {PRESSURE_UNITS.map((unit) => (
            <div key={unit.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor={unit.id} className="sm:w-1/3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {unit.label}
              </label>
              <input
                id={unit.id}
                type="number"
                className="input sm:w-2/3"
                placeholder={`0.00`}
                value={values[unit.id] || ""}
                onChange={(e) => handleInputChange(unit.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInputChange(unit.id, (e.target as HTMLInputElement).value);
                  }
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={handleClear} className="btn-brand mx-auto">
            Clear All Values
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
          What is the Pressure Converter?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          The Pressure Converter is a free, instant utility designed for engineers, students, meteorologists, and hobbyists. Pressure is defined as the force applied perpendicular to the surface of an object per unit area. Different fields of study and regions use drastically different scales to measure it.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          For example, mechanics typically use PSI (Pounds per Square Inch) for tire pressure, meteorologists rely on Millibars or Inches of Mercury (inHg) for atmospheric pressure, and scientists use Pascals (Pa) or Standard Atmospheres (atm). This tool bridges the gap by auto-syncing over a dozen standard pressure units simultaneously.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
          How to Use the Pressure Converter
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-8">
          <li>Locate the specific unit of pressure you currently have (e.g., PSI).</li>
          <li>Type your value into that specific input field.</li>
          <li>Instantly watch as all other pressure units (Bar, Pascal, Torr, etc.) calculate and populate automatically.</li>
          <li>If you need to calculate a new starting value, click "Clear All Values" or simply overwrite an existing field.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
          Frequently Asked Questions
        </h2>
        
        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
            What is the standard unit of pressure?
            <span className="transition group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            The International System of Units (SI) standard for pressure is the Pascal (Pa), which is equal to one newton per square meter (N/m²).
          </p>
        </details>

        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
            What is the difference between Torr and mmHg?
            <span className="transition group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            For almost all practical and engineering purposes, Torr and Millimeters of Mercury (mmHg) are identical (1 Torr ≈ 1 mmHg). Historically, they diverged very slightly by definition, but today they are treated as interchangeable in standard lab work.
          </p>
        </details>

        <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
            How many PSI are in a Bar?
            <span className="transition group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            One Bar is equivalent to approximately 14.5038 PSI. Bar is heavily used in Europe and standard industrial applications, whereas PSI is the imperial standard common in the United States.
          </p>
        </details>
      </div>
    </div>
  );
}