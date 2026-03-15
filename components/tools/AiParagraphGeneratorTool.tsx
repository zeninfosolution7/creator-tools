"use client"

import { useState } from "react"

export default function AiParagraphGeneratorTool() {

  const [topic, setTopic] = useState("")
  const [result, setResult] = useState("")

  function generate() {

    if (!topic) return

    setResult(
      `${topic} is an interesting topic widely discussed today. 
      Many people explore ${topic} to understand its benefits 
      and impact on modern life. Learning about ${topic} helps 
      individuals improve knowledge and stay informed.`
    )
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
        Generate Paragraph
      </button>

      {result && (
        <div className="bg-slate-800 p-4 rounded">
          {result}
        </div>
      )}

    </div>
  )
}
