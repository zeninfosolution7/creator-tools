"use client"

import { useState, useEffect } from "react"

export default function PasswordGeneratorTool() {

  const [length, setLength] = useState(12)

  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    safeSymbols: true,
    basicSymbols: true,
    advancedSymbols: false,
    avoidSimilar: false,
  })

  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState("")
  const [copied, setCopied] = useState(false)

  const charSets = {
    uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
    lowercase: "abcdefghijkmnopqrstuvwxyz",
    numbers: "23456789",
    safeSymbols: "_?.,",
    basicSymbols: "!@#$%^&*",
    advancedSymbols: "(){}[]<>?/\\|~`+=;:\"',"
  }

  function generatePassword() {

    let chars = ""

    if (options.uppercase)
      chars += options.avoidSimilar ? charSets.uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (options.lowercase)
      chars += options.avoidSimilar ? charSets.lowercase : "abcdefghijklmnopqrstuvwxyz"

    if (options.numbers)
      chars += options.avoidSimilar ? charSets.numbers : "0123456789"

    if (options.safeSymbols)
      chars += charSets.safeSymbols

    if (options.basicSymbols)
      chars += charSets.basicSymbols

    if (options.advancedSymbols)
      chars += charSets.advancedSymbols

    if (!chars) return

    let result = ""

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    setPassword(result)
    calculateStrength(result)
  }

  function calculateStrength(pw: string) {
    let score = 0

    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[a-z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++

    if (score <= 2) setStrength("Weak")
    else if (score <= 4) setStrength("Medium")
    else setStrength("Strong")
  }

  function toggleOption(key: keyof typeof options) {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Auto-generate password
  useEffect(() => {
    generatePassword()
  }, [length, options])

  return (
  <div className="max-w-xl mx-auto space-y-6">

    {/* OUTPUT */}
    <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-center">

      <div className="flex justify-between items-center gap-2">
        <span className="text-black dark:text-white break-all font-medium">
          {password || "Generate a password"}
        </span>

        <button
          onClick={() => {
            if (!password) return
            navigator.clipboard.writeText(password)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          }}
          className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Strength */}
      {password && (
        <div className="text-sm mt-2">
          Strength:{" "}
          <span className={
            strength === "Weak" ? "text-red-500" :
            strength === "Medium" ? "text-yellow-500" :
            "text-green-500"
          }>
            {strength}
          </span>
        </div>
      )}

    </div>

    {/* TOAST */}
    {copied && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
        Password Copied!
      </div>
    )}

    {/* LENGTH */}
    <div className="space-y-2">
      <label className="text-black dark:text-white text-sm font-medium">
        Length: {length}
      </label>

      <input
        type="range"
        min="4"
        max="50"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>

    {/* OPTIONS */}
    <div className="grid grid-cols-2 gap-3 text-sm">

      {[
        { key: "uppercase", label: "A-Z (Uppercase)" },
        { key: "lowercase", label: "a-z (Lowercase)" },
        { key: "numbers", label: "0-9 (Numbers)" },
        { key: "safeSymbols", label: "_ ? . , (Safe Symbols)" },
        { key: "basicSymbols", label: "!@#$%^&* (Basic Symbols)" },
        { key: "advancedSymbols", label: "(){}[] (Advanced Symbols)" },
        { key: "avoidSimilar", label: "Avoid Similar (O,0,l,1)" }
      ].map((opt) => (
        <label
          key={opt.key}
          className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded cursor-pointer"
        >
          <span className="text-black dark:text-white">
            {opt.label}
          </span>

          <input
            type="checkbox"
            checked={options[opt.key as keyof typeof options]}
            onChange={() => toggleOption(opt.key as keyof typeof options)}
            className="accent-blue-500"
          />
        </label>
      ))}

    </div>

  </div>
)
}