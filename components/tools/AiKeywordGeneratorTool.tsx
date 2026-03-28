"use client"

import { useState } from "react"

export default function AiKeywordGeneratorTool() {

  const [keyword, setKeyword] = useState("")
  const [results, setResults] = useState<string[]>([])

  function generate() {

    if (!keyword) return

    setResults([
      `${keyword} tutorial`,
      `${keyword} guide`,
      `best ${keyword}`,
      `${keyword} tools`,
      `${keyword} tips`
    ])
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <button
        onClick={generate}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Generate Keywords
      </button>

      {results.map((r, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 p-3 rounded">
          {r}
        </div>
      ))}

    </div>
  )
}
