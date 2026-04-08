"use client";

import React, { useState } from "react";

// Base Unit: Meters per second (m/s)
const SPEED_UNITS = [
  { id: "ms", label: "Meters per second (m/s)", factor: 1 },
  { id: "kmh", label: "Kilometers per hour (km/h)", factor: 1 / 3.6 },
  { id: "mph", label: "Miles per hour (mph)", factor: 0.44704 },
  { id: "fts", label: "Feet per second (ft/s)", factor: 0.3048 },
  { id: "knots", label: "Knots (kn)", factor: 0.514444444 },
  { id: "mach", label: "Mach (Speed of Sound)", factor: 343.0 },
  { id: "c", label: "Speed of Light (c)", factor: 299792458 },
];

export default function SpeedConverterTool() {
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

    const activeUnit = SPEED_UNITS.find((u) => u.id === unitId);
    if (!activeUnit) return;

    // Convert input to Base Unit (m/s)
    const baseValue = numValue * activeUnit.factor;
    const newValues: Record<string, string> = {};

    // Sync all units based on the m/s base value
    SPEED_UNITS.forEach((unit) => {
      if (unit.id === unitId) {
        newValues[unit.id] = value;
      } else {
        const converted = baseValue / unit.factor;
        // Format to prevent excessive decimal lengths, dropping trailing zeros
        newValues[unit.id] = Number.isInteger(converted) 
          ? converted.toString() 
          : parseFloat(converted.toFixed(8)).toString();
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
          <div className="w-full max-w-3xl h-[90px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg text-black dark:text-gray-500 text-sm">
            Ad Space (Leaderboard)
          </div>
        </div>

        <p className="text-black dark:text-gray-300 leading-relaxed mb-6 text-center">
          Instead of calculating one-by-one, type a value into any field below to instantly see the equivalent speed across all other units simultaneously.
        </p>

        <div className="space-y-4">
          {SPEED_UNITS.map((unit) => (
            <div key={unit.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor={unit.id} className="sm:w-1/3 text-sm font-medium text-black dark:text-gray-300">
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
    </div>
  );
}