"use client";

import { useState } from "react";

export default function YoutubeAspectRatioCalculatorTool() {

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [ratio, setRatio] = useState("");
  const [label, setLabel] = useState("");

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const detectFormat = (w: number, h: number) => {
    const r = w / h;

    if (Math.abs(r - 16 / 9) < 0.01) return "YouTube / Widescreen (16:9)";
    if (Math.abs(r - 1) < 0.01) return "Instagram Post (1:1)";
    if (Math.abs(r - 9 / 16) < 0.01) return "Reels / Shorts (9:16)";
    if (Math.abs(r - 4 / 5) < 0.01) return "Instagram Portrait (4:5)";

    return "Custom Ratio";
  };

  const calculate = () => {

    const w = parseFloat(width);
    const h = parseFloat(height);

    if (!w || !h) return;

    const divisor = gcd(w, h);

    const simplifiedW = w / divisor;
    const simplifiedH = h / divisor;

    setRatio(`${simplifiedW}:${simplifiedH}`);
    setLabel(detectFormat(w, h));
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">

      <h2 className="text-xl font-semibold text-center text-black dark:text-white">
        Aspect Ratio Calculator
      </h2>

      {/* INPUTS */}
      <div className="grid grid-cols-2 gap-4">

        <input
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="input"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={calculate}
        className="btn btn-primary w-full"
      >
        Calculate Ratio
      </button>

      {/* RESULT */}
      {ratio && (
        <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 text-center">

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Aspect Ratio
          </p>

          <p className="text-2xl font-bold text-black dark:text-white">
            {ratio}
          </p>

          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            {label}
          </p>

        </div>
      )}

    </div>
  );
}