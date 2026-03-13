"use client"

import { useState } from "react"

export default function PasswordGeneratorTool() {

const [password, setPassword] = useState("")

function generatePassword() {

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

let result = ""

for (let i = 0; i < 12; i++) {
result += chars[Math.floor(Math.random() * chars.length)]
}

setPassword(result)
}

return (

<div className="space-y-4">

<button
onClick={generatePassword}
className="bg-blue-500 px-4 py-2 rounded"
>
Generate Password
</button>

{password && (
<div className="bg-slate-700 p-3 rounded">
{password}
</div>
)}

</div>

)
}