"use client";

import { useState } from "react";

export default function YoutubeSeoCheckerTool() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleLimit = 100;
  const descLimit = 5000;

  const getStatus = (length: number, limit: number) => {
    if (length > limit) return "text-red-500";
    if (length > limit * 0.8) return "text-yellow-500";
    return "text-green-500";
  };
  
  const getCTRScore = (title: string) => {
  if (!title) return 0;

  let score = 0;

  if (title.length >= 50 && title.length <= 70) score += 30;
  if (/[0-9]/.test(title)) score += 10; // numbers increase CTR
  if (/[🔥🚀💡⚡🎯]/.test(title)) score += 10; // emojis
  if (/(how|why|best|top|guide|tips)/i.test(title)) score += 20; // power words
  if (title.split(" ").length >= 6) score += 10;

  return Math.min(score, 100);
};

const getRanking = (score: number) => {
  if (score >= 80) return { label: "Excellent", color: "text-green-500" };
  if (score >= 60) return { label: "Good", color: "text-yellow-500" };
  if (score >= 40) return { label: "Average", color: "text-orange-500" };
  return { label: "Poor", color: "text-red-500" };
};

const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, "<mark class='bg-yellow-300 text-black'>$1</mark>");
};

const keyword = title.split(" ")[0] || "";
const ctrScore = getCTRScore(title);
const ranking = getRanking(ctrScore);

  return (
  <div className="max-w-3xl mx-auto space-y-8">

    {/* TITLE */}
    <div className="space-y-2">

      <label className="text-sm font-medium text-gray-900 dark:text-white">
        Title
      </label>

      <textarea
        placeholder="Enter your YouTube title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full h-20 px-4 py-3 rounded-xl 
        bg-white dark:bg-gray-900
        text-black dark:text-white
        border border-gray-300 dark:border-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-all duration-200 resize-none shadow-sm"
      />

      {/* STATUS */}
      <div className="flex justify-between text-sm">
        <span className={getStatus(title.length, titleLimit)}>
          {title.length} / {titleLimit}
        </span>

        <span className={
          title.length === 0 ? "text-gray-400" :
          title.length < 40 ? "text-red-500" :
          title.length < 70 ? "text-yellow-500" :
          title.length <= 100 ? "text-green-500" :
          "text-red-500"
        }>
          {title.length === 0
            ? "—"
            : title.length < 40
            ? "Too Short"
            : title.length < 70
            ? "Good"
            : title.length <= 100
            ? "Best"
            : "Too Long"}
        </span>
      </div>

      {/* 🔥 CTR + RANK */}
      {title && (
        <div className="flex justify-between text-sm pt-1">
          <span className="text-gray-600 dark:text-gray-400">
            CTR Score: <span className="font-medium text-black dark:text-white">{ctrScore}%</span>
          </span>

          <span className={ranking.color}>
            {ranking.label}
          </span>
        </div>
      )}

      {/* 🔥 EMOJIS */}
      {title && (
        <div className="flex flex-wrap gap-2 pt-2">
          {["🔥","🚀","💡","⚡","🎯","📈","💰","📊","🎬","👀","😱","✅"].map((emoji, i) => (
            <button
              key={i}
              onClick={() => setTitle(title + " " + emoji)}
              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

    </div>

    {/* DESCRIPTION */}
    <div className="space-y-2">

      <label className="text-sm font-medium text-gray-900 dark:text-white">
        Description
      </label>

      <textarea
        placeholder="Enter your YouTube description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-28 px-4 py-3 rounded-xl 
        bg-white dark:bg-gray-900
        text-black dark:text-white
        border border-gray-300 dark:border-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-all duration-200 resize-y shadow-sm"
      />

      <div className="flex justify-between text-sm">
        <span className={getStatus(description.length, descLimit)}>
          {description.length} / {descLimit}
        </span>
      </div>

    </div>

    {/* 🔥 PREVIEW WITH KEYWORD HIGHLIGHT */}
    {(title || description) && (
      <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-2">

        <p className="text-xs text-gray-500">Preview</p>

        <p
          className="text-blue-600 dark:text-blue-400 font-medium line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(title || "", keyword)
          }}
        />

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description || "Description preview"}
        </p>

      </div>
    )}

    {/* TIPS */}
    <div className="p-5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 shadow-sm space-y-2">
      <ul className="text-sm text-black dark:text-white space-y-1">
        <li>• Use numbers & power words to increase CTR</li>
        <li>• Keep title between 60–70 characters</li>
        <li>• Add main keyword at the beginning</li>
      </ul>
    </div>

  </div>
)
}