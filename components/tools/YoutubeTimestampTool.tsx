"use client";

import { useState } from "react";

export default function YoutubeTimestampTool() {
  const [url, setUrl] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");

  const convertToSeconds = (timeStr: string) => {
    const parts = timeStr.split(":").map(Number).reverse();

    let seconds = 0;

    if (parts[0]) seconds += parts[0];
    if (parts[1]) seconds += parts[1] * 60;
    if (parts[2]) seconds += parts[2] * 3600;

    return seconds;
  };

  const generateLink = () => {
    if (!url || !time) return;

    const seconds = convertToSeconds(time);

    if (!seconds) return;

    const cleanUrl = url.split("&")[0];

    setResult(`${cleanUrl}&t=${seconds}s`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">

      <h2 className="text-xl font-semibold text-center text-black dark:text-white">
        YouTube Timestamp Link Generator
      </h2>

      {/* URL INPUT */}
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input"
      />

      {/* TIME INPUT */}
      <input
        type="text"
        placeholder="Enter time (e.g. 1:30 or 01:02:10)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="input"
      />

      {/* BUTTON */}
      <button
        onClick={generateLink}
        className="btn btn-primary w-full"
      >
        Generate Timestamp Link
      </button>

      {/* RESULT */}
      {result && (
        <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30">

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Generated Link
          </p>

          <p className="text-black dark:text-white break-all mt-1">
            {result}
          </p>

          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="mt-3 text-sm text-blue-600 dark:text-blue-400"
          >
            Copy Link
          </button>

        </div>
      )}

    </div>
  );
}