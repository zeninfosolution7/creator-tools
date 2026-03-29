"use client";

import { useState } from "react";

export default function YoutubeTitleGeneratorTool() {

  const [keyword, setKeyword] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  const detectCategory = (input: string) => {
    const text = input.toLowerCase();

    if (text.includes("fin")) return "finance";
    if (text.includes("gym") || text.includes("fit")) return "fitness";
    if (text.includes("ai") || text.includes("tech")) return "technology";
    if (text.includes("youtube")) return "youtube";

    return "general";
  };

  const generateTitles = () => {

    if (!keyword.trim()) return;

    const category = detectCategory(keyword);

    const hooks = [
      "Nobody Talks About",
      "You Must Know",
      "Before It's Too Late",
      "That Actually Work",
      "Beginners Must Watch",
      "Secrets Revealed",
      "Step-by-Step Guide",
      "Avoid These Mistakes",
      "Full Explained",
      "Ultimate Guide"
    ];

    const prefixes = [
      "How to",
      "Top 10",
      "Best",
      "Complete",
      "Beginner’s Guide to",
      "Why",
      "The Truth About",
      "Master",
    ];

    const endings = [
      "in 2026",
      "for Beginners",
      "Explained Simply",
      "That Work Fast",
      "Like a Pro",
      "Step-by-Step",
      "With Examples"
    ];

    let topic = keyword;

    // 🔥 category smart expansion
    if (category === "finance") topic = "Finance & Money Management";
    if (category === "fitness") topic = "Fitness & Workout";
    if (category === "technology") topic = "AI & Technology";

    const generated: string[] = [];

    for (let i = 0; i < 10; i++) {

      const title = `${
        prefixes[Math.floor(Math.random() * prefixes.length)]
      } ${topic} ${
        hooks[Math.floor(Math.random() * hooks.length)]
      } ${
        endings[Math.floor(Math.random() * endings.length)]
      }`;

      generated.push(title);
    }

    setTitles(generated);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">

      <h2 className="text-xl font-semibold text-center text-black dark:text-white">
        Smart YouTube Title Generator
      </h2>

      <input
        type="text"
        placeholder="Enter topic (e.g. finance, gym, AI tools)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="input"
      />

      <button
        onClick={generateTitles}
        className="btn-brand mx-auto"
      >
        Generate Smart Titles
      </button>

      {titles.length > 0 && (
        <div className="space-y-3">

          {titles.map((title, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-between items-center"
            >
              <span className="text-black dark:text-white text-sm">
                {title}
              </span>

              <button
                onClick={() => navigator.clipboard.writeText(title)}
                className="text-blue-600 dark:text-blue-400 text-xs"
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