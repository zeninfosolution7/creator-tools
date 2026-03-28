"use client"

import { useState } from "react"

export default function AiTitleGeneratorTool() {

  const [topic, setTopic] = useState("")
  const [titles, setTitles] = useState<string[]>([])

  function generate() {

    if (!topic) return

    setTitles([
      `10 Amazing Facts About ${topic}`,
      `The Ultimate Guide to ${topic}`,
      `Why ${topic} Is Important in 2025`,
      `${topic}: Everything You Need to Know`,
      `Beginner's Guide to ${topic}`
    ])
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <button
        onClick={generate}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Generate Titles
      </button>

      {titles.map((t, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 p-3 rounded">
          {t}
        </div>
      ))}

    </div>
  )
}
