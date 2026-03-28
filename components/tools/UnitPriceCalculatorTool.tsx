"use client";

import React, { useState, useEffect } from "react";

// Define the allowed units as a type
type WeightUnit = "gm" | "kg";

export default function UnitPriceCalculatorTool() {
  const [price, setPrice] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<WeightUnit>("gm");
  const [result, setResult] = useState<number | null>(null);

  const calculatePricePerKg = () => {
    const p = parseFloat(price);
    const w = parseFloat(weight);

    if (isNaN(p) || isNaN(w) || w <= 0) {
      setResult(null);
      return;
    }

    // Zero-Compute logic: All math happens in the user's browser
    if (unit === "gm") {
      setResult((p / w) * 1000);
    } else {
      setResult(p / w);
    }
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculatePricePerKg();
  }, [price, weight, unit]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
      <div className="space-y-6">
        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Total Price (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 50"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Weight & Unit Input */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight/Quantity
            </label>
            <input
              type="number"
              placeholder="e.g. 250"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unit
            </label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
              value={unit}
              // FIXED: Type cast e.target.value to WeightUnit
              onChange={(e) => setUnit(e.target.value as WeightUnit)}
            >
              <option value="gm">gm</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>

        {/* Result Display */}
        {result !== null && (
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">
              Price per Kilogram
            </p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">
              ₹{result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}