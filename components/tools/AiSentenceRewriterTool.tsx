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
        className="w-full p-3 input rounded h-32"
      />

      <button
        onClick={rewrite}
        className="btn-brand mx-auto"
      >
        Rewrite Sentence
      </button>

      {result && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded">
          {result}
        </div>
      )}

    </div>
  )
}
