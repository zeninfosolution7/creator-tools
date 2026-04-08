"use client";

import React, { useState, useEffect } from "react";

type TempUnits = {
  celsius: string;
  fahrenheit: string;
  kelvin: string;
  rankine: string;
  delisle: string;
  newton: string;
  reaumur: string;
  romer: string;
};

export default function TemperatureConverter() {
  const [values, setValues] = useState<TempUnits>({
    celsius: "0",
    fahrenheit: "32",
    kelvin: "273.15",
    rankine: "491.67",
    delisle: "150",
    newton: "0",
    reaumur: "0",
    romer: "7.5",
  });

  const convert = (val: number, source: keyof TempUnits) => {
    let c: number;

    // First, convert everything to Celsius (the base unit)
    switch (source) {
      case "celsius": c = val; break;
      case "fahrenheit": c = (val - 32) * 5 / 9; break;
      case "kelvin": c = val - 273.15; break;
      case "rankine": c = (val - 491.67) * 5 / 9; break;
      case "delisle": c = 100 - (val * 2 / 3); break;
      case "newton": c = val * 100 / 33; break;
      case "reaumur": c = val * 5 / 4; break;
      case "romer": c = (val - 7.5) * 40 / 21; break;
      default: c = 0;
    }

    // Convert Celsius to all other units
    setValues({
      celsius: parseFloat(c.toFixed(4)).toString(),
      fahrenheit: parseFloat(((c * 9 / 5) + 32).toFixed(4)).toString(),
      kelvin: parseFloat((c + 273.15).toFixed(4)).toString(),
      rankine: parseFloat(((c + 273.15) * 9 / 5).toFixed(4)).toString(),
      delisle: parseFloat(((100 - c) * 3 / 2).toFixed(4)).toString(),
      newton: parseFloat((c * 33 / 100).toFixed(4)).toString(),
      reaumur: parseFloat((c * 4 / 5).toFixed(4)).toString(),
      romer: parseFloat(((c * 21 / 40) + 7.5).toFixed(4)).toString(),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, unit: keyof TempUnits) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [unit]: val }));
    
    const num = parseFloat(val);
    if (!isNaN(num)) {
      convert(num, unit);
    }
  };

  const unitLabels: Record<keyof TempUnits, string> = {
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",
    rankine: "Rankine (°Ra)",
    delisle: "Delisle (°De)",
    newton: "Newton (°N)",
    reaumur: "Réaumur (°Ré)",
    romer: "Rømer (°Rø)",
  };

  return (
    <div className="card card-padding max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(unitLabels) as Array<keyof TempUnits>).map((unit) => (
          <div key={unit} className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black dark:text-white">
              {unitLabels[unit]}
            </label>
            <input
              type="number"
              value={values[unit]}
              onChange={(e) => handleChange(e, unit)}
              className="input w-full"
              placeholder={`Enter ${unitLabels[unit]}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-center text-sm italic text-black dark:text-gray-400">
          Changing any value will automatically update all other units in real-time.
        </p>
      </div>
    </div>
  );
}