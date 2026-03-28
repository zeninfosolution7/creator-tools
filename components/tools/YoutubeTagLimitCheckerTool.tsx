"use client";

import { useState } from "react";

export default function YoutubeTagLimitCheckerTool() {

  const [input, setInput] = useState("");

  const tags = input
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  const totalChars = input.length;
  const remaining = 500 - totalChars;

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* INPUT */}
      <div className="space-y-2">

        <label className="text-sm font-medium text-gray-900 dark:text-white">
          Enter Tags (comma separated)
        </label>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. youtube tips, seo, growth..."
          className="w-full h-24 px-4 py-3 rounded-xl 
          bg-white dark:bg-gray-900
          text-black dark:text-white
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all resize-y shadow-sm"
        />

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">

        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-center">
          <p className="text-xs text-gray-500">Tags</p>
          <p className="text-black dark:text-white font-semibold">
            {tags.length}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-center">
          <p className="text-xs text-gray-500">Characters</p>
          <p className="text-black dark:text-white font-semibold">
            {totalChars}
          </p>
        </div>

        <div className={`p-4 rounded-xl border shadow-sm text-center ${
          remaining < 0
            ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
            : "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
        }`}>
          <p className="text-xs text-gray-500">Remaining</p>
          <p className="font-semibold">
            {remaining}
          </p>
        </div>

      </div>

      {/* WARNING */}
      {remaining < 0 && (
        <div className="text-red-500 text-sm text-center">
          You exceeded YouTube tag limit (500 characters)
        </div>
      )}

    </div>
  );
}