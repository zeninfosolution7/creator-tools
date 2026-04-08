"use client";

import { useState, useEffect } from "react"
import { tools } from "@/lib/tools";
import Breadcrumb from "@/components/Breadcrumb";

const TIME_UNITS = {
  nanoseconds: { label: "Nanoseconds", multiplier: 1e-9 },
  microseconds: { label: "Microseconds", multiplier: 1e-6 },
  milliseconds: { label: "Milliseconds", multiplier: 1e-3 },
  seconds: { label: "Seconds", multiplier: 1 },
  minutes: { label: "Minutes", multiplier: 60 },
  hours: { label: "Hours", multiplier: 3600 },
  days: { label: "Days", multiplier: 86400 },
  weeks: { label: "Weeks", multiplier: 604800 },
  months: { label: "Months", multiplier: 2629800 }, // 1/12 of a Julian year (30.4375 days)
  years: { label: "Years", multiplier: 31557600 }, // Julian year (365.25 days)
  decades: { label: "Decades", multiplier: 315576000 },
  centuries: { label: "Centuries", multiplier: 3155760000 },
};

type UnitKey = keyof typeof TIME_UNITS;

const initialValues: Record<UnitKey, string> = {
  nanoseconds: "",
  microseconds: "",
  milliseconds: "",
  seconds: "",
  minutes: "",
  hours: "",
  days: "",
  weeks: "",
  months: "",
  years: "",
  decades: "",
  centuries: "",
};

export default function TimeConverterTool() {
  const [values, setValues] = useState<Record<UnitKey, string>>(initialValues);

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";
    if (num < 1e-6 || num > 1e15) return num.toExponential(6).replace(/\.?0+e/, "e");
    // Round to max 9 decimal places to avoid floating point anomalies
    const rounded = Math.round(num * 1e9) / 1e9;
    return rounded.toString();
  };

  const handleChange = (changedUnit: UnitKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Clear all fields instantly if the user deletes the input
    if (rawValue.trim() === "") {
      setValues(initialValues);
      return;
    }

    // Handle international comma inputs seamlessly
    const safeValue = rawValue.replace(",", ".");
    const num = parseFloat(safeValue);

    // Prevent NaN errors if the user types "-" or an incomplete decimal
    if (isNaN(num)) {
      setValues((prev) => ({ ...prev, [changedUnit]: rawValue }));
      return;
    }

    // Step 1: Convert current input to the base unit (seconds)
    const baseValueInSeconds = num * TIME_UNITS[changedUnit].multiplier;

    // Step 2: Push calculations to all other units
    const newValues = { ...initialValues };
    (Object.keys(TIME_UNITS) as UnitKey[]).forEach((unit) => {
      if (unit === changedUnit) {
        newValues[unit] = safeValue; // Keep exact user input to avoid cursor jumping
      } else {
        const converted = baseValueInSeconds / TIME_UNITS[unit].multiplier;
        newValues[unit] = formatNumber(converted);
      }
    });

    setValues(newValues);
  };

  const handleClear = () => {
    setValues(initialValues);
  };

  return (
    <div className="card card-padding max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(TIME_UNITS) as UnitKey[]).map((unit) => (
          <div key={unit} className="flex flex-col">
            <label 
              htmlFor={unit} 
              className="text-sm font-semibold mb-2 text-black dark:text-gray-200"
            >
              {TIME_UNITS[unit].label}
            </label>
            <input
              id={unit}
              type="number"
              step="any"
              className="input"
              value={values[unit]}
              onChange={(e) => handleChange(unit, e)}
              placeholder={`Enter ${TIME_UNITS[unit].label.toLowerCase()}...`}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-col items-center justify-center">
        <button 
          onClick={handleClear}
          className="btn-brand mx-auto"
          aria-label="Clear all values"
        >
          Clear Values
        </button>
        <p className="text-sm text-center mt-4 text-black dark:text-gray-400">
          Results update instantly as you type. No calculate button required.
        </p>
      </div>
    </div>
  );
}