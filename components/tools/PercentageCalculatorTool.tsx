"use client"

import { useState } from "react"

export default function PercentageCalculatorTool() {

  const [value, setValue] = useState("")
  const [percent, setPercent] = useState("")
  const [result, setResult] = useState("")

  function calculate() {

    const v = parseFloat(value)
    const p = parseFloat(percent)

    if (!v || !p) return

    setResult(((v * p) / 100).toString())
  }

  return (
    <div className="space-y-4">

      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <input
        type="number"
        placeholder="Percentage"
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <button
        onClick={calculate}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Calculate
      </button>

      {result && (
        <div className="bg-slate-800 p-4 rounded">
          Result: {result}
        </div>
      )}

    </div>
  )
}
