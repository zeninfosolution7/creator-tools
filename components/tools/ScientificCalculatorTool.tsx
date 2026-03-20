"use client"

import { useState } from "react"

export default function ScientificCalculatorTool() {

  const [expression, setExpression] = useState<string>("")
  const [result, setResult] = useState<string>("")

  function normalizeExpression(exp: string) {
  let normalized = exp
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\[/g, "(")
    .replace(/\]/g, ")")
    .replace(/\{/g, "(")
    .replace(/\}/g, ")")

  // 🔥 FIX: Insert multiplication automatically

  // number followed by bracket → 2(3+4) → 2*(3+4)
  normalized = normalized.replace(/(\d)(\()/g, "$1*$2")

  // closing bracket followed by number → (3+4)2 → (3+4)*2
  normalized = normalized.replace(/(\))(\d)/g, "$1*$2")

  // bracket followed by bracket → )( → )*(
  normalized = normalized.replace(/(\))(\()/g, "$1*$2")

  return normalized
}

  function isSafeExpression(exp: string) {
    return /^[0-9+\-*/().\s]+$/.test(exp)
  }

  function calculate() {
    try {
      if (!expression) return

      const normalized = normalizeExpression(expression)

      if (!isSafeExpression(normalized)) {
        setResult("Invalid Input")
        return
      }

      const output = Function(`"use strict"; return (${normalized})`)()

      setResult(String(output))
    } catch {
      setResult("Invalid Expression")
    }
  }

  function clearAll() {
    setExpression("")
    setResult("")
  }

  function backspace() {
    setExpression((prev) => prev.slice(0, -1))
  }

  function pasteFromClipboard() {
    navigator.clipboard.readText().then((text) => {
      setExpression(text)
    })
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
	
	<div className="bg-white dark:bg-black text-black dark:text-white p-2 rounded">
      Test Theme
    </div>

      {/* TITLE */}
      <h2 className="text-base text-white text-center font-medium">
        Scientific Calculator
      </h2>

      {/* INPUT FIELD (MAIN UPGRADE) */}
      <div className="space-y-2">

        <textarea
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter or paste expression..."
          className="w-full px-4 py-3 rounded bg-slate-800 text-white outline-none resize-none"
          rows={2}
        />

        <div className="flex justify-between gap-2">

          <button
            onClick={pasteFromClipboard}
            className="flex-1 bg-slate-700 py-2 rounded text-white text-sm hover:bg-slate-600"
          >
            Paste
          </button>

          <button
            onClick={calculate}
            className="flex-1 bg-blue-600 py-2 rounded text-white text-sm hover:bg-blue-500"
          >
            Calculate
          </button>

        </div>

      </div>

      {/* RESULT */}
      <div className="bg-slate-800 p-4 rounded">
        <div className="text-white text-lg font-semibold break-all">
          {result || "Result will appear here"}
        </div>
      </div>

      {/* BUTTON GRID */}
      <div className="grid grid-cols-4 gap-2">

        {[
          "7","8","9","/",
          "4","5","6","*",
          "1","2","3","-",
          "0",".","+","=",
          "(",")","[","]",
          "{","}","C","⌫"
        ].map((btn) => (

          <button
            key={btn}
            onClick={() => {
              if (btn === "=") return calculate()
              if (btn === "C") return clearAll()
              if (btn === "⌫") return backspace()
              setExpression((prev) => prev + btn)
            }}
            className="bg-slate-700 text-white py-3 rounded hover:bg-slate-600 active:scale-95 transition"
          >
            {btn}
          </button>

        ))}

      </div>

    </div>
  )
}