"use client"

import { useState } from "react"

export default function AiCaptionGeneratorTool() {

  const [topic, setTopic] = useState("")
  const [captions, setCaptions] = useState<string[]>([])

  function generate() {

    if (!topic) return

    setCaptions([
      `Loving this ${topic}!`,
      `${topic} vibes today.`,
      `Exploring ${topic} ✨`,
      `${topic} moments.`,
      `Life with ${topic}.`
    ])
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <button
        onClick={generate}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Generate Captions
      </button>

      {captions.map((c, i) => (
        <div key={i} className="bg-slate-800 p-3 rounded">
          {c}
        </div>
      ))}

    </div>
  )
}
