"use client"

import { useState, useEffect } from "react"
import { landStates } from "@/lib/landStates"
import { regionalUnits } from "@/lib/regionalUnits"

type Props = {
state?: string
initialArea?: number
initialUnit?: "feet" | "meter" | "yard"
}

type Values = Record<string, string>

export default function LandUnitConverterTool({
state,
initialArea,
initialUnit
}: Props) {

const initialState =
state && landStates[state] ? state : "english"

const [stateKey,setStateKey] = useState(initialState)

const stateData = landStates[stateKey]

const labels = stateData.labels ?? {}

const [values,setValues] = useState<Values>({})

const defaultPlaceholder = "Enter digits"

/* BASE UNITS */

const baseUnits = [
  { key:"acre",label:"Acre",factor:4046.856422 },
  { key:"hectare",label:"Hectare",factor:10000 },

  { key:"sqkm",label:"Square Kilometer",factor:1000000 },

  { key:"sqm",label:"Square Meter",factor:1 },
  { key:"sqft",label:"Square Foot",factor:0.09290304 },
  { key:"sqyd",label:"Square Yard",factor:0.83612736 },

  { key:"guntha",label:"Guntha",factor:101.17141 },
  { key:"katha",label:"Katha",factor:126.441 },
  { key:"marla",label:"Marla",factor:25.29285 },
  { key:"kanal",label:"Kanal",factor:505.85705 },
  { key:"cent",label:"Cent",factor:40.468564 },
  { key:"bigha",label:"Bigha",factor:stateData.bigha }
]

const stateRegionalUnits =
regionalUnits[stateKey] ?? []

const units = [...baseUnits,...stateRegionalUnits]

/* CONVERSION */

function convert(unitKey:string,valueStr:string){

const value = parseFloat(valueStr)

if(isNaN(value)) return

const unit = units.find(u=>u.key===unitKey)

if(!unit) return

const sqm = value * unit.factor

const updated:Values = {}

units.forEach(u=>{
updated[u.key] = (sqm / u.factor).toFixed(6)
})

setValues(updated)

}

/* USER INPUT */

function handleChange(key:string,val:string){

setValues(prev=>({
...prev,
[key]:val
}))

}

/* AUTO-FILL FROM PLOT CALCULATOR */

useEffect(()=>{

if(initialArea === undefined || initialArea === null) return

let key = "sqft"

if(initialUnit === "meter") key = "sqm"
if(initialUnit === "yard") key = "sqyd"

convert(key,initialArea.toString())

},[initialArea,initialUnit])

/* RESET WHEN STATE CHANGES */

useEffect(()=>{
setValues({})
},[stateKey])

return (

<div className="space-y-6">

{/* STATE SELECT */}

<div>

<select
value={stateKey}
onChange={(e)=>setStateKey(e.target.value)}
className="px-3 py-2 rounded bg-slate-700 text-white"

>

{Object.entries(landStates).map(([key,s])=>(

<option key={key} value={key}>
{s.name}
</option>
))}

</select>

</div>

{/* CONVERTER */}

<div className="max-w-3xl mx-auto space-y-4">

{units.map(unit=>(

<div key={unit.key} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">

<label className="md:w-48 text-base font-medium text-slate-200 flex items-center">
{labels?.[unit.key] ?? unit.label}
</label>

<input
type="text"
value={values[unit.key] ?? ""}
onChange={(e)=>handleChange(unit.key,e.target.value)}
onBlur={()=>convert(unit.key,values[unit.key])}
className="flex-1 px-4 py-2 rounded bg-slate-700 text-white"
placeholder={stateData?.placeholder || defaultPlaceholder}
/>

</div>
))}

</div>

</div>

)

}
