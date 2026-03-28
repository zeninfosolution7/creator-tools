"use client";

import React, { useState } from "react";

type WeightUnit = "gm" | "kg";

export default function UnitPriceCalculatorTool() {
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<WeightUnit>("gm");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [pricePerKg, setPricePerKg] = useState<string>("");

  // Helper to format results cleanly (max 2 decimal places)
  const formatResult = (val: number): string => {
    return parseFloat(val.toFixed(2)).toString();
  };

  // Zero-Compute Logic: 3-way data binding
  const handleInputChange = (
    field: "q" | "tp" | "ppk",
    value: string,
    currentUnit: WeightUnit
  ) => {
    // 1. Update the actively edited field
    if (field === "q") setQuantity(value);
    if (field === "tp") setTotalPrice(value);
    if (field === "ppk") setPricePerKg(value);

    // 2. Parse numbers
    const q = field === "q" ? parseFloat(value) : parseFloat(quantity);
    const tp = field === "tp" ? parseFloat(value) : parseFloat(totalPrice);
    const ppk = field === "ppk" ? parseFloat(value) : parseFloat(pricePerKg);

    const qValid = !isNaN(q) && q > 0;
    const tpValid = !isNaN(tp);
    const ppkValid = !isNaN(ppk);

    const qKg = qValid ? (currentUnit === "gm" ? q / 1000 : q) : 0;

    // 3. Dynamic Calculation based on what the user changed
    if (field === "q" && qValid) {
      if (ppkValid) setTotalPrice(formatResult(qKg * ppk));
      else if (tpValid) setPricePerKg(formatResult(tp / qKg));
    } else if (field === "tp" && tpValid) {
      if (qValid) setPricePerKg(formatResult(tp / qKg));
    } else if (field === "ppk" && ppkValid) {
      if (qValid) setTotalPrice(formatResult(qKg * ppk));
    }

    // 4. Handle clearing fields
    if (value === "") {
      if (field === "tp") setPricePerKg("");
      if (field === "ppk") setTotalPrice("");
    }
  };

  const handleUnitChange = (newUnit: WeightUnit) => {
    setUnit(newUnit);
    // Recalculate based on the new unit while maintaining current inputs
    handleInputChange("q", quantity, newUnit);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Unit Price Calculator
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter any two values (quantity + price OR quantity + rate) to instantly
          calculate price per kg or total amount.
        </p>
      </div>

      <div className="space-y-6">
        {/* Quantity Row */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quantity
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="e.g. 400"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={quantity}
              onChange={(e) => handleInputChange("q", e.target.value, unit)}
            />
            <select
              className="w-32 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value as WeightUnit)}
            >
              <option value="gm">gm</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>

        {/* Total Price Row */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Total Price (₹)
          </label>
          <input
            type="number"
            placeholder="Enter if you know total price"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={totalPrice}
            onChange={(e) => handleInputChange("tp", e.target.value, unit)}
          />
        </div>

        {/* Price per Kg Row */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price per Kg (₹)
          </label>
          <input
            type="number"
            placeholder="Enter if you know rate"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={pricePerKg}
            onChange={(e) => handleInputChange("ppk", e.target.value, unit)}
          />
        </div>
      </div>
    </div>
  );
}