"use client";

import { useState } from "react";

export default function ImageResolutionCalculatorTool() {

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<any>(null);

  const gcd = (a: number, b: number): number =>
    b === 0 ? a : gcd(b, a % b);

  const detectPlatform = (w: number, h: number) => {
    const ratio = w / h;

    if (Math.abs(ratio - 16/9) < 0.01) return "YouTube / Widescreen";
    if (Math.abs(ratio - 1) < 0.01) return "Instagram Post (1:1)";
    if (Math.abs(ratio - 9/16) < 0.01) return "Reels / Shorts (9:16)";
    if (Math.abs(ratio - 4/5) < 0.01) return "Instagram Portrait";

    return "Custom";
  };

  const calculate = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (!w || !h) return;

    const pixels = w * h;
    const mp = (pixels / 1_000_000).toFixed(2);

    const d = gcd(w, h);
    const ratio = `${w / d}:${h / d}`;

    const platform = detectPlatform(w, h);

    setResult({ pixels, mp, ratio, platform });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* INPUT */}
      <div className="grid grid-cols-2 gap-4">

        <input
          type="number"
          placeholder="Width (px)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Height (px)"
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
        Calculate
      </button>

      {/* RESULT */}
      {result && (
        <div className="space-y-4">

          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-2">

            <p className="text-sm text-gray-500">Total Pixels</p>
            <p className="text-lg font-semibold text-black dark:text-white">
              {result.pixels.toLocaleString()} px
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <p className="text-sm text-gray-500">Megapixels</p>
              <p className="text-black dark:text-white font-medium">
                {result.mp} MP
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <p className="text-sm text-gray-500">Aspect Ratio</p>
              <p className="text-black dark:text-white font-medium">
                {result.ratio}
              </p>
            </div>

          </div>

          <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Best Use
            </p>
            <p className="text-black dark:text-white font-medium">
              {result.platform}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}