"use client"

import { useState } from "react"

export default function AiMetaDescriptionGeneratorTool() {

  const [topic, setTopic] = useState("")
  const [result, setResult] = useState("")

  function generate() {

    if (!topic) return

    setResult(
      `Learn everything about ${topic}. Discover tips, guides and useful resources to understand ${topic} better.`
    )
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <button
        onClick={generate}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Generate Description
      </button>

      {result && (
        <div className="bg-slate-800 p-4 rounded">
          {result}
        </div>
      )}

    </div>
  )
}
