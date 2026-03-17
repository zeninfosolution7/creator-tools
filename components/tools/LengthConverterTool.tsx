"use client"

import { useState } from "react"

type Values = Record<string,string>

export default function LengthConverterTool(){

const [values,setValues] = useState<Values>({})

/* BASE UNIT = meter */

const units = [
{ key:"meter", label:"Meter", factor:1 },
{ key:"kilometer", label:"Kilometer", factor:1000 },
{ key:"centimeter", label:"Centimeter", factor:0.01 },
{ key:"millimeter", label:"Millimeter", factor:0.001 },
{ key:"inch", label:"Inch", factor:0.0254 },
{ key:"foot", label:"Foot", factor:0.3048 },
{ key:"yard", label:"Yard", factor:0.9144 },
{ key:"mile", label:"Mile", factor:1609.344 }
]

/* CONVERSION */

function convert(unitKey:string,valueStr:string){

const value = parseFloat(valueStr)

if(isNaN(value)){
setValues(prev=>({
...prev,
[unitKey]:valueStr
}))
return
}

const unit = units.find(u=>u.key===unitKey)

if(!unit) return

const meters = value * unit.factor

const updated:Values = {}

units.forEach(u=>{
updated[u.key] = (meters / u.factor).toFixed(6)
})

setValues(updated)

}

/* INPUT CHANGE */

function handleChange(key:string,val:string){

setValues(prev=>({
...prev,
[key]:val
}))

}

/* UI */

return(

<div className="space-y-6">

<h2 className="text-xl font-semibold text-white">
Length / Distance Converter
</h2>

<div className="max-w-3xl mx-auto space-y-4">

{units.map(unit=>(

<div key={unit.key} className="flex flex-col md:flex-row gap-2">

<label className="md:w-48 text-sm text-slate-300">
{unit.label}
</label>

<input
type="text"
value={values[unit.key] ?? ""}
onChange={(e)=>handleChange(unit.key,e.target.value)}
onBlur={()=>convert(unit.key,values[unit.key])}
className="flex-1 px-4 py-2 rounded bg-slate-700 text-white"
placeholder="Enter value"
/>

</div>
))}

</div>

</div>

)

}
