"use client"

import { useState } from "react"

export default function WaterTankCalculatorTool(){

const [diameter,setDiameter] = useState("")
const [height,setHeight] = useState("")

const [diameterUnit,setDiameterUnit] = useState("feet")
const [heightUnit,setHeightUnit] = useState("feet")

const [outputUnit,setOutputUnit] = useState("liter")

const [result,setResult] = useState<string | null>(null)

/* CONVERT ANY UNIT → METER */

function toMeter(value:number,unit:string){

switch(unit){
case "feet": return value * 0.3048
case "inch": return value * 0.0254
case "cm": return value * 0.01
case "mm": return value * 0.001
default: return value // meter
}

}

function calculate(){

const d = parseFloat(diameter)
const h = parseFloat(height)

if(isNaN(d) || isNaN(h)) return

/* convert to meter */

const d_m = toMeter(d,diameterUnit)
const h_m = toMeter(h,heightUnit)

/* radius */

const r = d_m / 2

/* volume in cubic meter */

const volume_m3 = Math.PI * r * r * h_m

let output = 0

/* OUTPUT CONVERSION */

switch(outputUnit){

case "liter":
output = volume_m3 * 1000
break

case "cubicfeet":
output = volume_m3 * 35.3147
break

default:
output = volume_m3

}

setResult(output.toFixed(2))

}

return(

<div className="space-y-6">

<h2 className="text-xl font-semibold text-black dark:text-white">
Water Tank Calculator (Advanced)
</h2>

{/* INPUT SECTION */}

<div className="grid md:grid-cols-2 gap-4">

<div className="flex gap-2">

<input
type="number"
placeholder="Diameter"
value={diameter}
onChange={(e)=>setDiameter(e.target.value)}
className="flex-1 px-4 py-2 rounded input text-black dark:text-white"
/>

<select
value={diameterUnit}
onChange={(e)=>setDiameterUnit(e.target.value)}
className="px-3 py-2 rounded input text-black dark:text-white"

>

<option value="feet">Feet</option>
<option value="meter">Meter</option>
<option value="inch">Inch</option>
<option value="cm">cm</option>
<option value="mm">mm</option>
</select>

</div>

<div className="flex gap-2">

<input
type="number"
placeholder="Height"
value={height}
onChange={(e)=>setHeight(e.target.value)}
className="flex-1 px-4 py-2 rounded input text-black dark:text-white"
/>

<select
value={heightUnit}
onChange={(e)=>setHeightUnit(e.target.value)}
className="px-3 py-2 rounded input text-black dark:text-white"

>

<option value="feet">Feet</option>
<option value="meter">Meter</option>
<option value="inch">Inch</option>
<option value="cm">cm</option>
<option value="mm">mm</option>
</select>

</div>

</div>

{/* OUTPUT UNIT */}

<div className="flex gap-2">

<select
value={outputUnit}
onChange={(e)=>setOutputUnit(e.target.value)}
className="px-4 py-2 rounded input text-black dark:text-white"

>

<option value="liter">Liter</option>
<option value="m3">Cubic Meter</option>
<option value="cubicfeet">Cubic Feet</option>

</select>

<button
type="button"
onClick={calculate}
className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-black dark:text-white"

>

Calculate </button>

</div>

{/* RESULT */}

{result && (

<div className="bg-white dark:bg-gray-900 p-4 rounded text-lg">

Result: {result} {outputUnit}

</div>

)}

</div>

)

}
