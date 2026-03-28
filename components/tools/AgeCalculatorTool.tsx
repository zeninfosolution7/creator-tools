"use client"

import { useState } from "react"

export default function AgeCalculatorTool() {

  const [dob, setDob] = useState("")
  const [age, setAge] = useState("")

  function calculateAge() {

    if (!dob) return

    const birth = new Date(dob)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      years--
    }

    setAge(`${years} years`)
  }

  return (
    <div className="space-y-4">

      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <button
        onClick={calculateAge}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Calculate Age
      </button>

      {age && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded">
          Your Age: {age}
        </div>
      )}

    </div>
  )
}
