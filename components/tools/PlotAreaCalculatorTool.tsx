"use client"

import { useState } from "react"
import LandUnitConverterTool from "./LandUnitConverterTool"

export default function PlotAreaCalculatorTool(){

const [width,setWidth] = useState("")
const [height,setHeight] = useState("")
const [unit,setUnit] = useState<"feet"|"meter"|"yard">("feet")

const [area,setArea] = useState<number | undefined>()

function calculateArea(){

const w = parseFloat(width)
const h = parseFloat(height)

if(isNaN(w) || isNaN(h)) return

setArea(w*h)

}

const unitLabel =
unit === "feet"
? "sq ft"
: unit === "meter"
? "sq m"
: "sq yd"

return (

<div className="space-y-10">

<div className="bg-white dark:bg-gray-900 p-6 rounded-xl space-y-4">

<h2 className="text-xl font-semibold text-black dark:text-white">
Plot Dimension Calculator
</h2>

<div className="grid md:grid-cols-4 gap-4">

<input
type="number"
placeholder="Width"
value={width}
onChange={(e)=>setWidth(e.target.value)}
className="px-4 py-2 rounded input text-black dark:text-white"
/>

<input
type="number"
placeholder="Height"
value={height}
onChange={(e)=>setHeight(e.target.value)}
className="px-4 py-2 rounded input text-black dark:text-white"
/>

<select
value={unit}
onChange={(e)=>setUnit(e.target.value as any)}
className="px-4 py-2 rounded input text-black dark:text-white"

>

<option value="feet">Feet</option>
<option value="meter">Meter</option>
<option value="yard">Yard</option>

</select>

<button
type="button"
onClick={calculateArea}
className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-black dark:text-white"

>

Calculate Area

</button>

</div>

{area !== undefined && (

<div className="text-lg text-black dark:text-white">

Area = <span className="font-semibold">
{area.toFixed(2)} </span> {unitLabel}

</div>

)}

</div>

<LandUnitConverterTool
initialArea={area}
initialUnit={unit}
/>

</div>

)

}
