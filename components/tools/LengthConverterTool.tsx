"use client"

import { useState } from "react"

export default function LengthConverterTool() {

  const [meters, setMeters] = useState("")
  const [feet, setFeet] = useState("")

  function convert() {

    const m = parseFloat(meters)

    if (!m) return

    setFeet((m * 3.28084).toFixed(2))
  }

  return (
    <div className="space-y-4">

      <input
        type="number"
        placeholder="Meters"
        value={meters}
        onChange={(e) => setMeters(e.target.value)}
        className="w-full p-3 bg-slate-700 rounded"
      />

      <button
        onClick={convert}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Convert
      </button>

      {feet && (
        <div className="bg-slate-800 p-4 rounded">
          Feet: {feet}
        </div>
      )}

    </div>
  )
}
