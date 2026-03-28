"use client"

import { useState } from "react"

export default function DiscountCalculatorTool() {

  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [finalPrice, setFinalPrice] = useState("")

  function calculate() {

    const p = parseFloat(price)
    const d = parseFloat(discount)

    if (!p || !d) return

    const result = p - (p * d) / 100

    setFinalPrice(result.toFixed(2))
  }

  return (
    <div className="space-y-4">

      <input
        type="number"
        placeholder="Original Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <input
        type="number"
        placeholder="Discount %"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        className="w-full p-3 input rounded"
      />

      <button
        onClick={calculate}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
      >
        Calculate Discount
      </button>

      {finalPrice && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded">
          Final Price: {finalPrice}
        </div>
      )}

    </div>
  )
}
