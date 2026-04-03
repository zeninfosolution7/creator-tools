"use client"

import { useState } from "react"
// Assuming AdBanner is exported from your components directory. If not, this is a placeholder.
// import AdBanner from "@/components/AdBanner"

type Values = Record<string, string>

export default function AngleConverterTool() {
  const [values, setValues] = useState<Values>({})

  const defaultPlaceholder = "Enter angle"

  /* ANGLE UNITS (BASE = DEGREE)
     The factor is: "How many Degrees are in 1 of this unit?"
  */
  const units = [
    { key: "degree", label: "Degree (°)", factor: 1 },
    { key: "radian", label: "Radian (rad)", factor: 180 / Math.PI }, // ~57.2958
    { key: "gradian", label: "Gradian (grad)", factor: 0.9 },        // 1 grad = 0.9 deg
    { key: "turn", label: "Turn (tr)", factor: 360 },                // 1 turn = 360 deg
    { key: "arcminute", label: "Arcminute (′)", factor: 1 / 60 },
    { key: "arcsecond", label: "Arcsecond (″)", factor: 1 / 3600 }
  ]

  /* CONVERSION FUNCTION */
  function convert(unitKey: string, valueStr: string | undefined) {
    if (!valueStr) return
    const value = parseFloat(valueStr)
    if (isNaN(value)) {
      setValues({}) // Clear fields if input is invalid
      return
    }

    const unit = units.find(u => u.key === unitKey)
    if (!unit) return

    // Convert to base unit (Degrees)
    const baseDegrees = value * unit.factor

    const updated: Values = {}

    units.forEach(u => {
      // Calculate and strip unnecessary trailing zeros using parseFloat
      const convertedValue = baseDegrees / u.factor
      updated[u.key] = parseFloat(convertedValue.toFixed(6)).toString()
    })

    setValues(updated)
  }

  /* HANDLE INPUT */
  function handleChange(key: string, val: string) {
    setValues(prev => ({
      ...prev,
      [key]: val
    }))
  }

  return (
    <div className="card card-padding space-y-6">

      {/* 🔥 TOP AD */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl h-[90px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg text-gray-500">
          Ad Space (Leaderboard)
        </div>
      </div>

      {/* CONVERTER MULTI-INPUT GRID */}
      <div className="max-w-3xl mx-auto space-y-4">
        {units.map(unit => (
          <div key={unit.key} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label className="md:w-48 text-base font-medium text-black dark:text-white">
              {unit.label}
            </label>

            <input
              type="number"
              value={values[unit.key] ?? ""}
              onChange={(e) => handleChange(unit.key, e.target.value)}
              onBlur={() => convert(unit.key, values[unit.key])}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  convert(unit.key, values[unit.key]);
                  (e.target as HTMLInputElement).blur(); // Remove focus to show completion
                }
              }}
              className="flex-1 px-4 py-2 rounded input text-black dark:text-white"
              placeholder={defaultPlaceholder}
            />
          </div>
        ))}
      </div>

    </div>
  )
}