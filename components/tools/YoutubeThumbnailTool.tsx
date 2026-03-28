"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function YoutubeThumbnailTool() {

  const searchParams = useSearchParams()

  const initialUrl = searchParams.get("url") || ""

  const [url, setUrl] = useState(initialUrl)
  const [videoId, setVideoId] = useState("")

  const thumbnails = [
    { name: "Max Resolution", file: "maxresdefault.jpg" },
    { name: "High Quality", file: "hqdefault.jpg" },
    { name: "Medium Quality", file: "mqdefault.jpg" },
    { name: "Standard", file: "sddefault.jpg" },
    { name: "Default", file: "default.jpg" },
  ]

  function extractVideoId(input: string) {
    const match = input.match(/(?:v=|youtu\.be\/)([^&]+)/)
    return match ? match[1] : ""
  }

  useEffect(() => {
    if (!url) return
    const id = extractVideoId(url)
    if (id) setVideoId(id)
  }, [url])

  function handleGenerate() {
    const id = extractVideoId(url)
    if (id) setVideoId(id)
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 rounded input text-black dark:text-white"
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Get Thumbnails
      </button>

      {videoId && (
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          {thumbnails.map((thumb) => (
            <div key={thumb.file} className="space-y-2">

              <p className="text-sm text-gray-400">
                {thumb.name}
              </p>

              <img
                src={`https://img.youtube.com/vi/${videoId}/${thumb.file}`}
                className="rounded"
              />

              <a
                href={`https://img.youtube.com/vi/${videoId}/${thumb.file}`}
                download
                className="text-blue-400 text-sm"
              >
                Download
              </a>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}