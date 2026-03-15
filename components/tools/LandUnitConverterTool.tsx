"use client"

import { useState } from "react"
import { landStates } from "@/lib/landStates"

const states = {

english:{
name:"Default (English)",
lang:"en",
bigha:2508,
labels:{
acre:"Acre",
hectare:"Hectare",
sqm:"Square Meter",
sqft:"Square Foot",
sqyd:"Square Yard",
guntha:"Guntha",
katha:"Katha",
marla:"Marla",
kanal:"Kanal",
cent:"Cent",
bigha:"Bigha"
}
},
gujarat:{
name:"Gujarat",
lang:"gu",
bigha:1618.7,
labels:{
acre:"એકર",
hectare:"હેક્ટર",
sqm:"ચોરસ મીટર",
sqft:"ચોરસ ફૂટ",
sqyd:"ચોરસ યાર્ડ",
guntha:"ગુઠ્ઠા",
katha:"કઠા",
marla:"મરલા",
kanal:"કેનાલ",
cent:"સેન્ટ",
bigha:"વિઘા"
}
},
bihar:{
name:"Bihar",
lang:"hi",
bigha:2529,
labels:{
acre:"एकड़",
hectare:"हेक्टेयर",
sqm:"वर्ग मीटर",
sqft:"वर्ग फुट",
sqyd:"वर्ग गज",
guntha:"गुंठा",
katha:"कट्ठा",
marla:"मरला",
kanal:"कनाल",
cent:"सेंट",
bigha:"बीघा",
dhur:"धुर"   // ADD THIS
}
},
uttar_pradesh:{
name:"Uttar Pradesh",
lang:"hi",
bigha:2508,
labels:{
acre:"एकड़",
hectare:"हेक्टेयर",
sqm:"वर्ग मीटर",
sqft:"वर्ग फुट",
sqyd:"वर्ग गज",
guntha:"गुंठा",
katha:"कट्ठा",
marla:"मरला",
kanal:"कनाल",
cent:"सेंट",
bigha:"बीघा",
biswa:"बिस्वा"
}
},
punjab:{
name:"Punjab",
lang:"pa",
bigha:1011,
labels:{
acre:"ਏਕੜ",
hectare:"ਹੈਕਟੇਅਰ",
sqm:"ਵਰਗ ਮੀਟਰ",
sqft:"ਵਰਗ ਫੁੱਟ",
sqyd:"ਵਰਗ ਗਜ਼",
guntha:"ਗੁੰਠਾ",
katha:"ਕੱਠਾ",
marla:"ਮਰਲਾ",
kanal:"ਕਨਾਲ",
cent:"ਸੈਂਟ",
bigha:"ਬਿੱਘਾ"
}
},
tamil_nadu:{
name:"Tamil Nadu",
lang:"ta",
bigha:2529,
labels:{
acre:"ஏக்கர்",
hectare:"ஹெக்டேர்",
sqm:"சதுர மீட்டர்",
sqft:"சதுர அடி",
sqyd:"சதுர யார்டு",
ground:"கிரௌண்டு"   // ADD THIS
}
},
maharashtra:{name:"Maharashtra",lang:"mr",bigha:2529},
rajasthan:{name:"Rajasthan",lang:"hi",bigha:2500},
west_bengal:{name:"West Bengal",lang:"bn",bigha:1337},
assam:{name:"Assam",lang:"as",bigha:1338},
madhya_pradesh:{name:"Madhya Pradesh",lang:"hi",bigha:2500},
haryana:{name:"Haryana",lang:"hi",bigha:2529},
kerala:{name:"Kerala",lang:"ml",bigha:2529},
karnataka:{name:"Karnataka",lang:"kn",bigha:2529},
telangana:{name:"Telangana",lang:"te",bigha:2529},
andhra_pradesh:{name:"Andhra Pradesh",lang:"te",bigha:2529}

}


const regionalUnits = {

uttar_pradesh:[
{key:"biswa",label:"Biswa",factor:125.418}
],

bihar:[
{key:"dhur",label:"Dhur",factor:16.93}
],

west_bengal:[
{key:"cottah",label:"Cottah",factor:66.89}
],

tamil_nadu:[
{key:"ground",label:"Ground",factor:203}
],

assam:[
{key:"kani",label:"Kani",factor:1337.8}
]

}



export default function LandUnitConverterTool() {

	const [stateKey,setStateKey]=useState("english")

	const state=states[stateKey]



  const baseUnits=[
{key:"acre",label:"Acre",factor:4046.856422},
{key:"hectare",label:"Hectare",factor:10000},
{key:"sqm",label:"Square Meter",factor:1},
{key:"sqft",label:"Square Foot",factor:0.09290304},
{key:"sqyd",label:"Square Yard",factor:0.83612736},
{key:"guntha",label:"Guntha",factor:101.17141},
{key:"katha",label:"Katha",factor:126.441},
{key:"marla",label:"Marla",factor:25.29285},
{key:"kanal",label:"Kanal",factor:505.85705},
{key:"cent",label:"Cent",factor:40.468564},
{key:"bigha",label:"Bigha",factor:state.bigha}
]

const units=[
...baseUnits,
...(regionalUnits[stateKey]||[])
]


  const [values, setValues] = useState<Record<string,string>>(
    Object.fromEntries(units.map(u => [u.key, ""]))
  )

  function handleChange(unitKey:string,value:string){
    setValues(prev => ({ ...prev, [unitKey]: value }))
  }

  function convert(unitKey:string){

    const value = values[unitKey]
    const num = parseFloat(value)

    if(isNaN(num)) return

    const unit = units.find(u => u.key === unitKey)!
    const sqm = num * unit.factor

    const updated:any = {}

    units.forEach(u=>{
      updated[u.key] = (sqm / u.factor).toFixed(6)
    })

    setValues(updated)
  }

  return (

    <div>

      <div className="mb-6">

        <label className="text-sm text-slate-300 mr-3">
          State
        </label>

       <select
value={stateKey}
onChange={(e)=>setStateKey(e.target.value)}
className="px-3 py-2 rounded bg-white text-black"
>

{Object.entries(states).map(([key,state])=>(
<option key={key} value={key}>
{state.name}
</option>
))}

</select>


      </div>

      <div className="max-w-3xl mx-auto mt-8 space-y-4">

        {units.map(unit => (

          <div key={unit.key} className="flex flex-col md:flex-row gap-2">

            <label className="md:w-48 text-sm text-slate-300">
			{state.labels?.[unit.key] || unit.label}
            </label>

            <input
              type="text"
              value={values[unit.key]}
              onChange={(e)=>handleChange(unit.key,e.target.value)}
              onBlur={()=>convert(unit.key)}
              onKeyDown={(e)=>{
                if(e.key === "Enter") convert(unit.key)
              }}
              placeholder="Enter value"
              className="flex-1 px-4 py-2 rounded bg-white text-black outline-none"
            />

          </div>

        ))}

      </div>

    </div>

  )
}
