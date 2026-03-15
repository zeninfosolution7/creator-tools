"use client"

import { useState } from "react"

export default function ScientificCalculatorTool() {

  const [expression, setExpression] = useState("")
  const [result, setResult] = useState("")

  function calculate() {

    try {
      const res = eval(expression)
      setResult(res.toString())
    } catch {
      setResult("Invalid expression")
    }
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Enter expression e.g. 5*3+2"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
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
