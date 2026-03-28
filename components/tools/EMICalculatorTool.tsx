'use client'

import { useState } from 'react'

export default function EMICalculatorTool() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [emi, setEmi] = useState<number | null>(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const R = parseFloat(rate) / 12 / 100
    const N = parseFloat(years) * 12

    if (!P || !R || !N) {
      setEmi(null)
      return
    }

    const EMI =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1)

    setEmi(Math.round(EMI))
  }

  return (
    <div className="card card-padding max-w-xl mx-auto space-y-6">

      {/* TITLE */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">
          EMI Calculator
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Calculate your monthly loan EMI instantly
        </p>
      </div>

      {/* INPUTS */}
      <div className="space-y-4">

        <div>
          <label className="block text-sm mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            placeholder="e.g. 8.5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Loan Duration (Years)
          </label>
          <input
            type="number"
            placeholder="e.g. 20"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="input"
          />
        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={calculate}
        className="btn btn-primary w-full text-lg"
      >
        Calculate EMI
      </button>

     {/* 🔥 AD (AFTER ACTION, BEFORE RESULT) */}
  {emi !== null && (
    <div className="my-6 flex justify-center">
      <div className="w-full max-w-md h-[250px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg">
        Ad Space
      </div>
    </div>
  )}

      {/* RESULT */}
      {emi !== null && (
        <div className="card p-6 text-center space-y-2">

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monthly EMI
          </p>

          <p className="text-3xl font-bold">
            ₹ {emi.toLocaleString()}
          </p>

        </div>
      )}

    </div>
  )
}