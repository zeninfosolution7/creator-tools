"use client";

import { useState } from "react";

export default function YoutubeTagExtractorTool() {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractTags = async () => {
    setError("");
    setTags([]);

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/youtube-tags?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.tags) {
        setTags(data.tags);
      } else {
        setError("No tags found or video does not allow access");
      }

    } catch (err) {
      setError("Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">

      <h2 className="text-xl font-semibold text-center text-black dark:text-white">
        YouTube Tag Extractor
      </h2>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Paste YouTube video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input"
      />

      {/* BUTTON */}
      <button
        onClick={extractTags}
        className="btn btn-primary w-full"
      >
        {loading ? "Extracting..." : "Extract Tags"}
      </button>

      {/* ERROR */}
      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      {/* TAGS */}
      {tags.length > 0 && (
        <div className="space-y-3">

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* COPY ALL */}
          <button
            onClick={() => navigator.clipboard.writeText(tags.join(", "))}
            className="w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Copy All Tags
          </button>

        </div>
      )}

    </div>
  );
}