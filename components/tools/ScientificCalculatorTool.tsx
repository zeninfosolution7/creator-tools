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
  <div className="max-w-md mx-auto space-y-5">

    {/* TITLE */}
    <h2 className="text-lg font-semibold text-black dark:text-white text-center">
      Scientific Calculator
    </h2>

    {/* INPUT + ACTIONS */}
    <div className="space-y-3">

      <textarea
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            calculate()
          }
        }}
        placeholder="Enter expression (e.g. 2+3*5)"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"
        rows={2}
      />

      <div className="flex gap-2">

        <button
          onClick={pasteFromClipboard}
          className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Paste
        </button>

        <button
          onClick={calculate}
          className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-500 active:scale-95 transition"
        >
          Calculate
        </button>

      </div>

    </div>

    {/* RESULT */}
    <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 text-center">

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Result
      </div>

      <div className="text-xl font-semibold text-black dark:text-white break-all mt-1">
        {result || "—"}
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
      ].map((btn) => {

        const isOperator = ["/","*","-","+","="].includes(btn)
        const isAction = ["C","⌫"].includes(btn)

        return (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") return calculate()
              if (btn === "C") return clearAll()
              if (btn === "⌫") return backspace()
              setExpression((prev) => prev + btn)
            }}
            className={`
              py-3 rounded-xl text-sm font-medium transition active:scale-95
              
              ${isOperator
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : isAction
                ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60"
                : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }
            `}
          >
            {btn}
          </button>
        )
      })}

    </div>

  </div>
)
}