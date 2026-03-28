"use client"

import { useState } from "react"

export default function TipCalculatorTool() {

  const [bill, setBill] = useState("")
  const [tip, setTip] = useState("")
  const [result, setResult] = useState("")

  function calculate() {

    const b = parseFloat(bill)
    const t = parseFloat(tip)

    if (!b || !t) return

    const tipAmount = (b * t) / 100

    setResult((b + tipAmount).toFixed(2))
  }

  return (
    <div className="space-y-4">

      <input
        type="number"
        placeholder="Bill Amount"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <input
        type="number"
        placeholder="Tip %"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <button
        onClick={calculate}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Calculate Tip
      </button>

      {result && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded">
          Total: {result}
        </div>
      )}

    </div>
  )
}
