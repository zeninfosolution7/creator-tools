"use client";

import { useState } from "react";

export default function YoutubeTitleLengthCheckerTool() {

  const [title, setTitle] = useState("");

  const length = title.length;

  const getStatus = () => {
    if (length === 0) return { text: "-", color: "text-gray-400" };
    if (length < 40) return { text: "Too Short", color: "text-red-500" };
    if (length <= 70) return { text: "Best", color: "text-green-500" };
    if (length <= 100) return { text: "Okay", color: "text-yellow-500" };
    return { text: "Too Long", color: "text-red-500" };
  };

  const status = getStatus();

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* INPUT */}
      <div className="space-y-2">

        <label className="text-sm font-medium text-gray-900 dark:text-white">
          Enter Video Title
        </label>

        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type your YouTube title..."
          className="w-full h-24 px-4 py-3 rounded-xl 
          bg-white dark:bg-gray-900
          text-black dark:text-white
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-cyan-500
          transition-all resize-y shadow-sm"
        />

      </div>

      {/* RESULT CARD */}
      <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-3">

        <div className="flex justify-between items-center">

          <span className="text-sm text-gray-500">
            Character Count
          </span>

          <span className="text-black dark:text-white font-semibold">
            {length} / 100
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-sm text-gray-500">
            Status
          </span>

          <span className={`${status.color} font-medium`}>
            {status.text}
          </span>

        </div>

        {/* PROGRESS BAR (BRAND COLOR TEST 🔥) */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-blue-700 to-cyan-400 transition-all"
            style={{ width: `${Math.min(length, 100)}%` }}
          />

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigator.clipboard.writeText(title)}
        className="w-full py-3 rounded-xl text-white font-medium 
        bg-gradient-to-r from-blue-700 to-cyan-400
        hover:opacity-90 transition"
      >
        Copy Title
      </button>

      {/* TIP */}
      <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-400">

        Best YouTube titles are between <span className="font-medium text-black dark:text-white">50–70 characters</span> for higher click-through rate.

      </div>

    </div>
  );
}