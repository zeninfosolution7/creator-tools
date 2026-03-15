"use client"

import { useState } from "react"

export default function EMICalculatorTool() {

  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [emi, setEmi] = useState("")

  function calculate() {

    const p = parseFloat(principal)
    const r = parseFloat(rate) / 12 / 100
    const n = parseFloat(years) * 12

    if (!p || !r || !n) return

    const result =
      (p * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)

    setEmi(result.toFixed(2))
  }

  return (
    <div className="space-y-4">

      <input
        type="number"
        placeholder="Loan Amount"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <input
        type="number"
        placeholder="Interest Rate %"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <input
        type="number"
        placeholder="Loan Years"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <button
        onClick={calculate}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Calculate EMI
      </button>

      {emi && (
        <div className="bg-slate-800 p-4 rounded">
          Monthly EMI: {emi}
        </div>
      )}

    </div>
  )
}
