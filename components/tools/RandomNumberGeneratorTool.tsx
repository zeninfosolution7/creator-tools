"use client"

import { useState } from "react"

export default function RandomNumberGeneratorTool() {

  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [result, setResult] = useState("")

  function generate() {

    const mn = parseInt(min)
    const mx = parseInt(max)

    if (!mn || !mx) return

    const num =
      Math.floor(Math.random() * (mx - mn + 1)) + mn

    setResult(num.toString())
  }

  return (
    <div className="space-y-4">

      <input
        type="number"
        placeholder="Minimum"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <input
        type="number"
        placeholder="Maximum"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <button
        onClick={generate}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Generate
      </button>

      {result && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded">
          Random Number: {result}
        </div>
      )}

    </div>
  )
}
