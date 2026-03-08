"use client";

import { useState } from "react";

export default function ThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const extractVideoId = (link: string) => {
    const match = link.match(
      /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/,
    );
    return match ? match[1] : "";
  };

  const handleSubmit = () => {
    const id = extractVideoId(url);
    setVideoId(id);
  };

  const thumbnails = [
    "maxresdefault",
    "hqdefault",
    "mqdefault",
    "sddefault",
  ];

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        YouTube Thumbnail Downloader
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Paste YouTube video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Get Thumbnails
      </button>

      {videoId && (
        <div className="mt-6 space-y-4">
          {thumbnails.map((type) => {
            const src = `https://img.youtube.com/vi/${videoId}/${type}.jpg`;
            return (
              <div key={type}>
                <img src={src} alt="thumbnail" className="mb-2" />
                <a
                  href={src}
                  download
                  className="text-blue-600 underline"
                >
                  Download {type}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}