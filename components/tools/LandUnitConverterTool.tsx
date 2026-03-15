"use client"

import { useState, useEffect } from "react"
import { landStates } from "@/lib/landStates"
import { regionalUnits } from "@/lib/regionalUnits"

type Props = {
  state?: string
}

export default function LandUnitConverterTool({ state }: Props) {

const initialState: keyof typeof landStates =
  state && state in landStates
    ? (state as keyof typeof landStates)
    : "english"

const [stateKey, setStateKey] = useState<keyof typeof landStates>(initialState)

const stateData = landStates[stateKey]

useEffect(()=>{
  setValues({})
},[stateKey])

  const baseUnits = [
  { key: "acre", label: "Acre", factor: 4046.856422 },
  { key: "hectare", label: "Hectare", factor: 10000 },
  { key: "sqm", label: "Square Meter", factor: 1 },
  { key: "sqft", label: "Square Foot", factor: 0.09290304 },
  { key: "sqyd", label: "Square Yard", factor: 0.83612736 },
  { key: "guntha", label: "Guntha", factor: 101.17141 },
  { key: "katha", label: "Katha", factor: 126.441 },
  { key: "marla", label: "Marla", factor: 25.29285 },
  { key: "kanal", label: "Kanal", factor: 505.85705 },
  { key: "cent", label: "Cent", factor: 40.468564 },
  { key: "bigha", label: "Bigha", factor: stateData.bigha },
]

const stateRegionalUnits =
  regionalUnits[stateKey as keyof typeof regionalUnits] || []



  const units = [
    ...baseUnits,
    ...(regionalUnits[stateKey] || []),
  ]

  const [values, setValues] = useState<Record<string, string>>({})

  function handleChange(unitKey: string, value: string) {
    setValues((prev) => ({ ...prev, [unitKey]: value }))
  }

  function convert(unitKey: string) {

  const value = parseFloat(values[unitKey])

  if (isNaN(value)) return

  const unit = units.find(u => u.key === unitKey)

  if (!unit) return

  const sqm = value * unit.factor

  const updated: Record<string,string> = {}

  units.forEach(u=>{
    updated[u.key] = (sqm / u.factor).toFixed(6)
  })

  setValues(updated)

}

  return (
    <div className="space-y-6">

      {/* STATE SELECTOR */}

      <div>
        <select
          value={stateKey}
          onChange={(e) => setStateKey(e.target.value)}
          className="px-3 py-2 rounded bg-white text-black"
        >
		{Object.entries(landStates).map(([key, s]) => (
            <option key={key} value={key}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* CONVERTER */}

      <div className="max-w-3xl mx-auto space-y-4">

        {units.map((unit) => (

          <div key={unit.key} className="flex flex-col md:flex-row gap-2">

            <label className="md:w-48 text-sm text-slate-300">
              {stateData.labels?.[unit.key] || unit.label}
            </label>

            <input
              type="text"
              value={values[unit.key] || ""}
              onChange={(e) =>
                handleChange(unit.key, e.target.value)
              }
              onBlur={() => convert(unit.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter") convert(unit.key)
              }}
              className="flex-1 px-4 py-2 rounded bg-white text-black"
              placeholder="Enter value"
            />

          </div>

        ))}

      </div>
    </div>
  )
}
