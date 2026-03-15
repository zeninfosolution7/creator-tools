"use client"

import { useState } from "react"

export default function AiBlogIdeaGeneratorTool() {

  const [topic, setTopic] = useState("")
  const [ideas, setIdeas] = useState<string[]>([])

  function generate() {

    if (!topic) return

    setIdeas([
      `Top 10 Tips About ${topic}`,
      `Common Mistakes in ${topic}`,
      `Beginner Guide to ${topic}`,
      `Future of ${topic}`,
      `${topic} Case Studies`
    ])
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Blog topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <button
        onClick={generate}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Generate Blog Ideas
      </button>

      {ideas.map((idea, i) => (
        <div key={i} className="bg-slate-800 p-3 rounded">
          {idea}
        </div>
      ))}

    </div>
  )
}
