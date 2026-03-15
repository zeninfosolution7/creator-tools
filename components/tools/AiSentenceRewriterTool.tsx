"use client"

import { useState } from "react"

export default function AiSentenceRewriterTool() {

  const [text, setText] = useState("")
  const [result, setResult] = useState("")

  function rewrite() {

    if (!text) return

    setResult(`In other words: ${text}`)
  }

  return (
    <div className="space-y-4">

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded h-32"
      />

      <button
        onClick={rewrite}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Rewrite Sentence
      </button>

      {result && (
        <div className="bg-slate-800 p-4 rounded">
          {result}
        </div>
      )}

    </div>
  )
}
