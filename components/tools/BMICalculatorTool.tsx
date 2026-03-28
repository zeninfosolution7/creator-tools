"use client"

import { useState } from "react"

export default function BMICalculatorTool() {

  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState("")

  function calculate() {

    const h = parseFloat(height) / 100
    const w = parseFloat(weight)

    if (!h || !w) return

    const result = w / (h * h)

    setBmi(result.toFixed(2))
  }

  return (
    <div className="space-y-4">

      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <button
        onClick={calculate}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Calculate BMI
      </button>

      {bmi && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded">
          BMI: {bmi}
        </div>
      )}

    </div>
  )
}
