"use client"

import { useState } from "react"

export default function JsonFormatterTool() {

  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  function formatJson() {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")
    } catch {
      setError("Invalid JSON")
      setOutput("")
    }
  }

  return (
    <div className="space-y-6">

      {/* TOOL UI */}

      <textarea
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-40 p-3 rounded bg-slate-700 text-white"
      />

      <button
        onClick={formatJson}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
      >
        Format JSON
      </button>

      {error && (
        <p className="text-red-400">{error}</p>
      )}

      {output && (
        <pre className="bg-slate-800 p-4 rounded overflow-auto">
          {output}
        </pre>
      )}

      {/* SEO CONTENT */}

      <div className="mt-10 text-left text-gray-300 space-y-4">

        <h2 className="text-xl font-semibold text-white">
          What is a JSON Formatter?
        </h2>

        <p>
          A JSON formatter is an online tool that converts messy JSON data into a clean and readable format.
          Developers often use JSON formatters when working with APIs, configuration files, or debugging data.
        </p>

        <p>
          When JSON data is returned from an API, it often appears in a compressed form that is difficult to read.
          This tool automatically restructures the JSON so it becomes easy to understand.
        </p>

        <h3 className="text-lg font-semibold text-white">
          Why use a JSON Formatter?
        </h3>

        <ul className="list-disc ml-6 space-y-2">

          <li>Makes JSON data easier to read</li>
          <li>Helps debug API responses</li>
          <li>Useful for developers and testers</li>
          <li>Validates JSON structure</li>

        </ul>

      </div>

    </div>
  )
}