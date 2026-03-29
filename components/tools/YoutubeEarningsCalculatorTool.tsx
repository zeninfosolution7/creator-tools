"use client";

import { useState } from "react";

export default function YoutubeEarningsCalculatorTool() {

  const [views, setViews] = useState("");
  const [cpm, setCpm] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const v = parseFloat(views);
    const c = parseFloat(cpm);

    if (!v || !c) return;

    const base = (v / 1000) * c;

    const low = base * 0.5;
    const avg = base;
    const high = base * 1.5;

    setResult({ low, avg, high });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* INPUT */}
      <div className="grid grid-cols-2 gap-4">

        <input
          type="number"
          placeholder="Total Views"
          value={views}
          onChange={(e) => setViews(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="CPM (per 1000 views)"
          value={cpm}
          onChange={(e) => setCpm(e.target.value)}
          className="input"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={calculate}
        className="btn-brand mx-auto"
      >
        Calculate Earnings
      </button>

      {/* RESULT */}
      {result && (
        <div className="space-y-4">

          <div className="grid grid-cols-3 gap-4">

            <div className="p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-center">
              <p className="text-xs text-gray-500">Low Estimate</p>
              <p className="text-black dark:text-white font-semibold">
                ₹ {result.low.toFixed(2)}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 text-center">
              <p className="text-xs text-gray-500">Average</p>
              <p className="text-black dark:text-white font-semibold">
                ₹ {result.avg.toFixed(2)}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-center">
              <p className="text-xs text-gray-500">High Estimate</p>
              <p className="text-black dark:text-white font-semibold">
                ₹ {result.high.toFixed(2)}
              </p>
            </div>

          </div>

          {/* EXTRA INSIGHT */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">

            <p className="text-sm text-gray-500">
              Monthly Estimate
            </p>

            <p className="text-black dark:text-white font-medium">
              ₹ {(result.avg * 30).toFixed(2)}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}