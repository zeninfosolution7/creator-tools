"use client";

import { useState } from "react";

export default function TextCaseConverterTool() {
  const [text, setText] = useState("");

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());

  const toTitleCase = () => {
    setText(
      text
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  const toSentenceCase = () => {
    setText(
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );
  };

  const clearText = () => setText("");

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      <h2 className="text-lg font-semibold text-center text-black dark:text-white">
        Text Case Converter
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-40 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

        <button onClick={toUpper} className="py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition">
          UPPERCASE
        </button>

        <button onClick={toLower} className="py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          lowercase
        </button>

        <button onClick={toTitleCase} className="py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          Title Case
        </button>

        <button onClick={toSentenceCase} className="py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          Sentence case
        </button>

        <button onClick={clearText} className="py-2 rounded-lg bg-red-500 text-white hover:bg-red-400 transition">
          Clear
        </button>

      </div>

      <button
        onClick={() => navigator.clipboard.writeText(text)}
        className="w-full py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        Copy Text
      </button>

    </div>
  );
}