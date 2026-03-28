"use client";

import { useState, useEffect } from "react";

export default function PricePerKgCalculatorTool() {
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<"gm" | "kg">("gm");
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");

  const [result, setResult] = useState({
    perKg: "",
    total: "",
  });

  useEffect(() => {
    const q = parseFloat(quantity);

    if (!q || q <= 0) {
      setResult({ perKg: "", total: "" });
      return;
    }

    const grams = unit === "kg" ? q * 1000 : q;

    const p = parseFloat(price);
    const r = parseFloat(rate);

    // CASE 1: Price + Quantity → Rate
    if (p && !r) {
      const perKg = (p / grams) * 1000;

      setResult({
        perKg: perKg.toFixed(2), // 🔥 FIXED
        total: "",
      });
    }

    // CASE 2: Rate + Quantity → Total
    else if (r && !p) {
      const total = (r * grams) / 1000;

      setResult({
        perKg: "",
        total: total.toFixed(2), // 🔥 FIXED
      });
    }

    else {
      setResult({ perKg: "", total: "" });
    }

  }, [quantity, unit, price, rate]);

  return (
    <div className="card card-padding space-y-5">

      {/* 🔹 TITLE */}
      <h2 className="text-xl font-semibold text-center">
        Unit Price Calculator
      </h2>

      {/* 🔹 DESCRIPTION */}
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        Enter any two values (quantity + price OR quantity + rate) to instantly calculate price per kg or total amount.
      </p>

      {/* 🔹 QUANTITY */}
      <div>
        <label className="block text-sm mb-1">
          Quantity
        </label>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="e.g. 400"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input flex-1"
          />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as "gm" | "kg")}
            className="input w-24"
          >
            <option value="gm">gm</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>

      {/* 🔹 PRICE INPUT */}
      <div>
        <label className="block text-sm mb-1">
          Total Price (₹)
        </label>
        <input
          type="number"
          placeholder="Enter if you know total price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input"
        />
      </div>

      {/* 🔹 RATE INPUT */}
      <div>
        <label className="block text-sm mb-1">
          Price per Kg (₹)
        </label>
        <input
          type="number"
          placeholder="Enter if you know rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="input"
        />
      </div>

      {/* 🔥 RESULT */}
      {(result.perKg || result.total) && (
        <div className="card p-5 text-center space-y-2">

          {result.perKg && (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Price per Kg
              </p>
              <p className="text-2xl font-bold">
                ₹ {result.perKg}
              </p>
            </>
          )}

          {result.total && (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Price
              </p>
              <p className="text-2xl font-bold">
                ₹ {result.total}
              </p>
            </>
          )}

        </div>
      )}

    </div>
  );
}