"use client";

import { useState } from "react";

export default function YoutubeTitleFormatterTool() {

  const [input, setInput] = useState("");

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
  };

  const capitalizeSentence = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const results = {
    titleCase: toTitleCase(input),
    upper: input.toUpperCase(),
    lower: input.toLowerCase(),
    sentence: capitalizeSentence(input),
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 dark:text-white">
          Enter Title
        </label>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your YouTube title..."
          className="w-full h-24 px-4 py-3 rounded-xl 
          bg-white dark:bg-gray-900
          text-black dark:text-white
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all resize-y shadow-sm"
        />
      </div>

      {/* OUTPUT */}
      {input && (
        <div className="space-y-4">

          {[
            { label: "Title Case", value: results.titleCase },
            { label: "UPPERCASE", value: results.upper },
            { label: "lowercase", value: results.lower },
            { label: "Sentence case", value: results.sentence },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-black dark:text-white text-sm break-all">
                  {item.value}
                </p>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(item.value)}
                className="text-sm text-blue-600 dark:text-blue-400"
              >
                Copy
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}