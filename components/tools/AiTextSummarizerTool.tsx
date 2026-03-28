"use client"

import { useState } from "react"

export default function AiTextSummarizerTool() {

  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")

  function summarize() {

    if (!text) return

    const sentences = text.split(".")
    const result = sentences.slice(0, 3).join(".") + "."

    setSummary(result)
  }

  return (
    <div className="space-y-4">

      <textarea
        placeholder="Paste long text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 input rounded h-40"
      />

      <button
        onClick={summarize}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Summarize Text
      </button>

      {summary && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded">
          {summary}
        </div>
      )}

    </div>
  )
}
