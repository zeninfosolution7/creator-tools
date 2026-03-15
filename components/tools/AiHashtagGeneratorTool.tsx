"use client"

import { useState } from "react"

export default function AiHashtagGeneratorTool() {

  const [keyword, setKeyword] = useState("")
  const [tags, setTags] = useState<string[]>([])

  function generate() {

    if (!keyword) return

    const base = keyword.replace(/\s/g, "")

    setTags([
      `#${base}`,
      `#${base}Tips`,
      `#${base}Ideas`,
      `#${base}Life`,
      `#${base}Guide`,
      `#${base}Community`
    ])
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <button
        onClick={generate}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Generate Hashtags
      </button>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="bg-slate-800 px-3 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

    </div>
  )
}
