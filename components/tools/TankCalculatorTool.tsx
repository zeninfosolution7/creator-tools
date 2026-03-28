"use client"

import { useState } from "react"

export default function TankCalculatorTool() {

  const [shape, setShape] = useState("cylinder")

  const [values, setValues] = useState({
    diameter: "",
    height: "",
    length: "",
    width: ""
  })

  const [units, setUnits] = useState({
    diameter: "meter",
    height: "meter",
    length: "meter",
    width: "meter"
  })

  const [outputUnit, setOutputUnit] = useState("liter")

  const [flowRate, setFlowRate] = useState("")
  const [flowUnit, setFlowUnit] = useState("lpm")
  const [timeResult, setTimeResult] = useState<string | null>(null)

  const [result, setResult] = useState<string | null>(null)

  function toMeter(value: number, unit: string) {
    switch (unit) {
      case "feet": return value * 0.3048
      case "inch": return value * 0.0254
      case "cm": return value * 0.01
      case "mm": return value * 0.001
      default: return value
    }
  }

  function calculate() {

    let volume_m3 = 0

    if (shape === "cylinder") {
      const d = parseFloat(values.diameter)
      const h = parseFloat(values.height)

      if (isNaN(d) || isNaN(h)) return

      const d_m = toMeter(d, units.diameter)
      const h_m = toMeter(h, units.height)

      const r = d_m / 2
      volume_m3 = Math.PI * r * r * h_m
    }

    if (shape === "rectangle") {
      const l = parseFloat(values.length)
      const w = parseFloat(values.width)
      const h = parseFloat(values.height)

      if (isNaN(l) || isNaN(w) || isNaN(h)) return

      const l_m = toMeter(l, units.length)
      const w_m = toMeter(w, units.width)
      const h_m = toMeter(h, units.height)

      volume_m3 = l_m * w_m * h_m
    }

    let output = volume_m3

    if (outputUnit === "liter") output = volume_m3 * 1000
    if (outputUnit === "cubicfeet") output = volume_m3 * 35.3147

    setResult(output.toFixed(2))

    // Filling time
    const flow = parseFloat(flowRate)

    if (!isNaN(flow) && flow > 0) {

      let flowPerMinute = flow

      if (flowUnit === "lph") {
        flowPerMinute = flow / 60
      }

      const volumeLiters = volume_m3 * 1000
      const timeMinutes = volumeLiters / flowPerMinute

      const hours = Math.floor(timeMinutes / 60)
      const minutes = Math.floor(timeMinutes % 60)

      setTimeResult(`${hours} hr ${minutes} min`)
    }
  }

  function updateValue(key: string, value: string) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  function updateUnit(key: string, unit: string) {
    setUnits(prev => ({ ...prev, [key]: unit }))
  }

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-black dark:text-white">
        Tank Volume Calculator
      </h2>

      {/* Shape */}
      <select
        value={shape}
        onChange={(e) => setShape(e.target.value)}
        className="px-4 py-2 rounded input text-black dark:text-white"
      >
        <option value="cylinder">Round Tank</option>
        <option value="rectangle">Rectangular Tank</option>
      </select>

      {/* INPUTS */}
      <div className="space-y-4">

        {/* CYLINDER */}
        {shape === "cylinder" && (
          <>
            <div className="space-y-1">
              <label className="md:w-48 text-base font-medium text-black dark:text-white flex shrink-0">Diameter</label>
              <div className="grid grid-cols-[1fr_auto] gap-2 w-full items-center">
                <input
                  type="number"
                  placeholder="Enter digits"
                  value={values.diameter}
                  onChange={(e) => updateValue("diameter", e.target.value)}
                  className="w-full min-w-0 px-4 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={units.diameter}
                  onChange={(e) => updateUnit("diameter", e.target.value)}
                  className="w-[100px] sm:w-[110px] px-3 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="meter" className="dark:bg-[#0f172a]">m</option>
                  <option value="feet" className="dark:bg-[#0f172a]">ft</option>
                  <option value="inch" className="dark:bg-[#0f172a]">in</option>
                  <option value="cm" className="dark:bg-[#0f172a]">cm</option>
                  <option value="mm" className="dark:bg-[#0f172a]">mm</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="md:w-48 text-base font-medium text-black dark:text-white flex shrink-0">Height</label>
              <div className="grid grid-cols-[1fr_auto] gap-2 w-full items-center">
                <input
                  type="number"
                  placeholder="Enter digits"
                  value={values.height}
                  onChange={(e) => updateValue("height", e.target.value)}
                  className="w-full min-w-0 px-4 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={units.height}
                  onChange={(e) => updateUnit("height", e.target.value)}
                  className="w-[100px] sm:w-[110px] px-3 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="meter" className="dark:bg-[#0f172a]">m</option>
                  <option value="feet" className="dark:bg-[#0f172a]">ft</option>
                  <option value="inch" className="dark:bg-[#0f172a]">in</option>
                  <option value="cm" className="dark:bg-[#0f172a]">cm</option>
                  <option value="mm" className="dark:bg-[#0f172a]">mm</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* RECTANGLE */}
        {shape === "rectangle" && (
          <>
            <div className="space-y-1">
              <label className="md:w-48 text-base font-medium text-black dark:text-white flex shrink-0">Length</label>
              <div className="grid grid-cols-[1fr_auto] gap-2 w-full items-center">
                <input
                  type="number"
                  placeholder="Enter digits"
                  value={values.length}
                  onChange={(e) => updateValue("length", e.target.value)}
                  className="w-full min-w-0 px-4 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={units.length}
                  onChange={(e) => updateUnit("length", e.target.value)}
                  className="w-[100px] sm:w-[110px] px-3 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="meter" className="dark:bg-[#0f172a]">m</option>
                  <option value="feet" className="dark:bg-[#0f172a]">ft</option>
                  <option value="inch" className="dark:bg-[#0f172a]">in</option>
                  <option value="cm" className="dark:bg-[#0f172a]">cm</option>
                  <option value="mm" className="dark:bg-[#0f172a]">mm</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="md:w-48 text-base font-medium text-black dark:text-white flex shrink-0">Width</label>
              <div className="grid grid-cols-[1fr_auto] gap-2 w-full items-center">
                <input
                  type="number"
                  placeholder="Enter digits"
                  value={values.width}
                  onChange={(e) => updateValue("width", e.target.value)}
                  className="w-full min-w-0 px-4 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={units.width}
                  onChange={(e) => updateUnit("width", e.target.value)}
                  className="w-[100px] sm:w-[110px] px-3 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="meter" className="dark:bg-[#0f172a]">m</option>
                  <option value="feet" className="dark:bg-[#0f172a]">ft</option>
                  <option value="inch" className="dark:bg-[#0f172a]">in</option>
                  <option value="cm" className="dark:bg-[#0f172a]">cm</option>
                  <option value="mm" className="dark:bg-[#0f172a]">mm</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="md:w-48 text-base font-medium text-black dark:text-white flex shrink-0">Height (Depth)</label>
              <div className="grid grid-cols-[1fr_auto] gap-2 w-full items-center">
                <input
                  type="number"
                  placeholder="Enter digits"
                  value={values.height}
                  onChange={(e) => updateValue("height", e.target.value)}
                  className="w-full min-w-0 px-4 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={units.height}
                  onChange={(e) => updateUnit("height", e.target.value)}
                  className="w-[100px] sm:w-[110px] px-3 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="meter" className="dark:bg-[#0f172a]">m</option>
                  <option value="feet" className="dark:bg-[#0f172a]">ft</option>
                  <option value="inch" className="dark:bg-[#0f172a]">in</option>
                  <option value="cm" className="dark:bg-[#0f172a]">cm</option>
                  <option value="mm" className="dark:bg-[#0f172a]">mm</option>
                </select>
              </div>
            </div>
          </>
        )}

      </div>

      {/* FLOW RATE */}
      <div className="space-y-1 mt-4">
        <label className="md:w-48 text-base font-medium text-black dark:text-white flex shrink-0">Flow Rate</label>
        <div className="grid grid-cols-[1fr_auto] gap-2 w-full items-center">
          <input
            type="number"
            placeholder="Enter digits"
            value={flowRate}
            onChange={(e) => setFlowRate(e.target.value)}
            className="w-full min-w-0 px-4 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={flowUnit}
            onChange={(e) => setFlowUnit(e.target.value)}
            className="w-[100px] sm:w-[110px] px-3 py-2 rounded input text-black dark:text-white border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="lpm" className="dark:bg-[#0f172a]">L/min</option>
            <option value="lph" className="dark:bg-[#0f172a]">L/hour</option>
          </select>
        </div>
      </div>

      {/* OUTPUT */}
      <div className="flex gap-2">
        <select
          value={outputUnit}
          onChange={(e) => setOutputUnit(e.target.value)}
          className="px-4 py-2 rounded input text-black dark:text-white"
        >
          <option value="liter">Liters</option>
          <option value="m3">Cubic Meter</option>
          <option value="cubicfeet">Cubic Feet</option>
        </select>

        <button
          onClick={calculate}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-black dark:text-white"
        >
          Calculate
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded text-lg space-y-2">
          <div>Volume: {result} {outputUnit}</div>
          {timeResult && <div>Filling Time: {timeResult}</div>}
        </div>
      )}

    </div>
  )
}