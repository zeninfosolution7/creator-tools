"use client"

import { useState } from "react"
import AdBanner from "@/components/AdBanner"

type Values = Record<string, string>

export default function WeightConverterTool() {

  const [values, setValues] = useState<Values>({})

  const defaultPlaceholder = "Enter weight"

  /* WEIGHT UNITS (BASE = GRAM) */
  const units = [
    { key: "tonne", label: "Tonne", factor: 1000000 },
    { key: "kilogram", label: "Kilogram", factor: 1000 },
    { key: "gram", label: "Gram", factor: 1 },
    { key: "milligram", label: "Milligram", factor: 0.001 },

    { key: "pound", label: "Pound (lb)", factor: 453.59237 },
    { key: "ounce", label: "Ounce (oz)", factor: 28.349523125 },
    { key: "stone", label: "Stone", factor: 6350.29318 }
  ]

  /* CONVERSION FUNCTION */
  function convert(unitKey: string, valueStr: string) {

    const value = parseFloat(valueStr)
    if (isNaN(value)) return

    const unit = units.find(u => u.key === unitKey)
    if (!unit) return

    const grams = value * unit.factor

    const updated: Values = {}

    units.forEach(u => {
      updated[u.key] = (grams / u.factor).toFixed(6)
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
        <div className="w-full max-w-3xl h-[90px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg">
          Ad Space (Leaderboard)
        </div>
      </div>

      {/* CONVERTER */}
      <div className="max-w-3xl mx-auto space-y-4">

        {units.map(unit => (

          <div key={unit.key} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">

            <label className="md:w-48 text-base font-medium text-black dark:text-white">
              {unit.label}
            </label>

            <input
              type="text"
              value={values[unit.key] ?? ""}
              onChange={(e) => handleChange(unit.key, e.target.value)}
              onBlur={() => convert(unit.key, values[unit.key])}
              className="flex-1 px-4 py-2 rounded input text-black dark:text-white"
              placeholder={defaultPlaceholder}
            />

          </div>

        ))}

      </div>

    </div>

  )
}