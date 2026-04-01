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
        className="w-full p-3 input rounded"
      />

      <button
        onClick={generate}
        className="btn-brand mx-auto"
      >
        Generate Hashtags
      </button>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="bg-white dark:bg-gray-900 px-3 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

    </div>
  )
}
