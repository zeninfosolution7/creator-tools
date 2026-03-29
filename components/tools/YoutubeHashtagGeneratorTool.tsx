"use client";

import { useState } from "react";

export default function YoutubeHashtagGeneratorTool() {

  const [input, setInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generateHashtags = () => {
    if (!input.trim()) return;

    const words = input.toLowerCase().split(" ");

    let tags = new Set<string>();

    // Base combinations
    tags.add("#" + words.join(""));
    tags.add("#" + words.join("_"));

    words.forEach(word => {
      tags.add("#" + word);
      tags.add("#" + word + "tips");
      tags.add("#best" + word);
      tags.add("#" + word + "guide");
    });

    // Common creator hashtags
    const common = [
      "#youtube",
      "#youtuber",
      "#contentcreator",
      "#viral",
      "#trending",
      "#shorts",
      "#reels",
      "#video"
    ];

    common.forEach(tag => tags.add(tag));

    setHashtags(Array.from(tags).slice(0, 25));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 dark:text-white">
          Enter Keyword
        </label>

        <input
          type="text"
          placeholder="e.g. finance tips"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input w-full"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={generateHashtags}
        className="btn-brand mx-auto"
      >
        Generate Hashtags
      </button>

      {/* RESULT */}
      {hashtags.length > 0 && (
        <div className="space-y-4">

          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full 
                bg-gray-200 dark:bg-gray-800 
                text-black dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* COPY */}
          <button
            onClick={() => navigator.clipboard.writeText(hashtags.join(" "))}
            className="w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Copy All Hashtags
          </button>

        </div>
      )}

    </div>
  );
}