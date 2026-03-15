"use client"

import { useState } from "react"

export default function DateDifferenceTool() {

  const [d1, setD1] = useState("")
  const [d2, setD2] = useState("")
  const [result, setResult] = useState("")

  function calculate() {

    const date1 = new Date(d1)
    const date2 = new Date(d2)

    const diff =
      Math.abs(date2.getTime() - date1.getTime())

    const days = diff / (1000 * 3600 * 24)

    setResult(days.toFixed(0))
  }

  return (
    <div className="space-y-4">

      <input
        type="date"
        value={d1}
        onChange={(e) => setD1(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <input
        type="date"
        value={d2}
        onChange={(e) => setD2(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <button
        onClick={calculate}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Calculate Difference
      </button>

      {result && (
        <div className="bg-slate-800 p-4 rounded">
          Difference: {result} days
        </div>
      )}

    </div>
  )
}
