"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const THUMBNAILS = [
  { key: "maxresdefault", label: "Max Resolution" },
  { key: "hqdefault", label: "HD (High Quality)" },
  { key: "sddefault", label: "SD (Standard Definition)" },
];

function extractVideoId(link: string): string {
  if (!link) return "";

  const match = link.match(/(?:v=|youtu\.be\/)([^&]+)/);
  if (match?.[1]) return match[1];

  const extraPatterns = [
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of extraPatterns) {
    const extraMatch = link.match(pattern);
    if (extraMatch?.[1]) return extraMatch[1];
  }

  return "";
}

export default function YoutubeThumbnailTool() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const initialUrl = searchParams.get("url");
    if (!initialUrl) return;

    setUrl(initialUrl);

    const id = extractVideoId(initialUrl.trim());
    if (!id) {
      setError("Please enter a valid YouTube URL.");
      setVideoId("");
      return;
    }

    setError("");
    setVideoId(id);
  }, [searchParams]);

  const handleSubmit = () => {
    const id = extractVideoId(url.trim());
    if (!id) {
      setError("Please enter a valid YouTube URL.");
      setVideoId("");
      return;
    }

    setError("");
    setVideoId(id);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {/* URL input + button */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="url"
          placeholder="Paste YouTube video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-3 rounded-lg border border-slate-600 bg-slate-900/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold text-white shrink-0"
        >
          Get Thumbnails
        </button>
      </div>

      {error && <p className="text-sm text-red-400 text-left">{error}</p>}

      {/* Thumbnails grid */}
      {videoId && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-left">
            Preview & Download
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {THUMBNAILS.map(({ key, label }) => {
              const src = `https://img.youtube.com/vi/${videoId}/${key}.jpg`;

              return (
                <div
                  key={key}
                  className="bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden flex flex-col"
                >
                  <div className="aspect-video bg-slate-900">
                    <img
                      src={src}
                      alt={`${label} thumbnail`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <div className="text-sm font-medium text-white">
                      {label}
                    </div>
                    <a
                      href={src}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold"
                    >
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

