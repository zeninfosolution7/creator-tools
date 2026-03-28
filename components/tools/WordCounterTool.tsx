"use client"

import { useState } from "react"

export default function WordCounterTool() {

  const [text, setText] = useState("")

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, "").length

  return (

    <div className="space-y-6">

      <textarea
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 p-4 rounded input text-black dark:text-white outline-none"
      />

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white dark:bg-gray-900 p-4 rounded text-center">
          <p className="text-sm text-gray-400">Words</p>
          <p className="text-2xl font-bold">{words}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded text-center">
          <p className="text-sm text-gray-400">Characters</p>
          <p className="text-2xl font-bold">{characters}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded text-center">
          <p className="text-sm text-gray-400">Characters (No Spaces)</p>
          <p className="text-2xl font-bold">{charactersNoSpaces}</p>
        </div>

      </div>

    </div>

  )
}