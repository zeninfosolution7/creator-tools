import LandUnitConverterTool from "@/components/tools/LandUnitConverterTool"

export default function StateLandConverterPage({
  params,
}: {
  params: { state: string }
}) {

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <LandUnitConverterTool state={params.state} />
    </div>
  )
}