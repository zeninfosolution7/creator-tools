"use client"

import { useState } from "react"

export default function AiUsernameGeneratorTool() {

  const [name, setName] = useState("")
  const [users, setUsers] = useState<string[]>([])

  function generate() {

    if (!name) return

    setUsers([
      `${name}_official`,
      `${name}_hub`,
      `${name}_world`,
      `${name}_pro`,
      `${name}_daily`
    ])
  }

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <button
        onClick={generate}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Generate Usernames
      </button>

      {users.map((u, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 p-3 rounded">
          {u}
        </div>
      ))}

    </div>
  )
}
