import LandUnitConverterTool from "@/components/tools/LandUnitConverterTool"
import { landStates } from "@/lib/landStates"

type StateKey = keyof typeof landStates

export default function StateLandConverterPage({
  params,
}: {
  params: { state: string }
}) {

  const state = params.state as StateKey

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <LandUnitConverterTool state={state} />
    </div>
  )
}