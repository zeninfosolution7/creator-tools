"use client";

import React, { useState, useEffect } from "react";

type WeightUnit = "gm" | "kg";

export default function UnitPriceCalculator() {
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<WeightUnit>("gm");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [pricePerKg, setPricePerKg] = useState<string>("");

  const formatResult = (val: number): string => {
    return parseFloat(val.toFixed(2)).toString();
  };

  const handleInputChange = (
    field: "q" | "tp" | "ppk",
    value: string,
    currentUnit: WeightUnit
  ) => {
    if (field === "q") setQuantity(value);
    if (field === "tp") setTotalPrice(value);
    if (field === "ppk") setPricePerKg(value);

    const q = field === "q" ? parseFloat(value) : parseFloat(quantity);
    const tp = field === "tp" ? parseFloat(value) : parseFloat(totalPrice);
    const ppk = field === "ppk" ? parseFloat(value) : parseFloat(pricePerKg);

    const qValid = !isNaN(q) && q > 0;
    const tpValid = !isNaN(tp);
    const ppkValid = !isNaN(ppk);

    const qKg = qValid ? (currentUnit === "gm" ? q / 1000 : q) : 0;

    if (field === "q" && qValid) {
      if (ppkValid) setTotalPrice(formatResult(qKg * ppk));
      else if (tpValid) setPricePerKg(formatResult(tp / qKg));
    } else if (field === "tp" && tpValid) {
      if (qValid) setPricePerKg(formatResult(tp / qKg));
    } else if (field === "ppk" && ppkValid) {
      if (qValid) setTotalPrice(formatResult(qKg * ppk));
    }

    if (value === "" && field === "tp") setPricePerKg("");
    if (value === "" && field === "ppk") setTotalPrice("");
  };

  const handleUnitChange = (newUnit: WeightUnit) => {
    setUnit(newUnit);
    handleInputChange("q", quantity, newUnit);
  };

  return (
    <div className="card card-padding max-w-3xl mx-auto">
      <div className="grid gap-6">
        {/* Quantity Input with Unit Toggle */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <div className="grid grid-cols-[1fr_90px] gap-3">
            <input
              type="number"
              placeholder="e.g. 500"
              className="input w-full"
              value={quantity}
              onChange={(e) => handleInputChange("q", e.target.value, unit)}
              onKeyDown={(e) => e.key === 'Enter' && handleInputChange("q", quantity, unit)}
            />
            <select
              className="input w-full cursor-pointer px-2"
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value as WeightUnit)}
            >
              <option value="gm">GM</option>
              <option value="kg">KG</option>
            </select>
          </div>
        </div>

        {/* Price Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Total Price (₹)
            </label>
            <input
              type="number"
              placeholder="Total amount"
              className="input"
              value={totalPrice}
              onChange={(e) => handleInputChange("tp", e.target.value, unit)}
              onKeyDown={(e) => e.key === 'Enter' && handleInputChange("tp", totalPrice, unit)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Price per KG (₹)
            </label>
            <input
              type="number"
              placeholder="Rate per kg"
              className="input"
              value={pricePerKg}
              onChange={(e) => handleInputChange("ppk", e.target.value, unit)}
              onKeyDown={(e) => e.key === 'Enter' && handleInputChange("ppk", pricePerKg, unit)}
            />
          </div>
        </div>

        <button 
          onClick={() => handleInputChange("q", quantity, unit)}
          className="btn-brand w-full md:w-auto mt-2"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}