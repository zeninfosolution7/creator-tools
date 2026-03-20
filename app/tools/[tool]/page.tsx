import { getToolBySlug, tools } from "@/lib/tools"
import { notFound } from "next/navigation"
import { toolComponents } from "@/lib/toolComponents"
import Link from "next/link"

import Breadcrumb from "@/components/Breadcrumb"

export async function generateMetadata({ params }: any) {
  const tool = getToolBySlug((await params).tool)

  if (!tool) return {}

  return {
    title: `${tool.title} | CreatorTools`,
    description: tool.description,
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>
}) {

  const { tool } = await params

  const toolData = getToolBySlug(tool)

  if (!toolData) return notFound()

  const ToolComponent =
    toolComponents[toolData.component as keyof typeof toolComponents]

  return (
  <div className="min-h-screen bg-slate-900 text-white pb-8">

    {/* 🔹 BREADCRUMB (JUST BELOW HEADER) */}
<div className="max-w-4xl mx-auto px-4 pt-1 pb-1">
  <div className="text-[10px] md:text-xs text-slate-500">
    <Breadcrumb
      category={toolData.category}
      toolTitle={toolData.title}
    />
  </div>
</div>

{/* 🔹 TITLE + DESCRIPTION */}
<div className="max-w-4xl mx-auto px-4 pb-3 text-center">

  <h1 className="text-2xl md:text-3xl font-semibold">
    {toolData.title}
  </h1>

  <p className="text-sm md:text-base text-slate-400 mt-2 max-w-2xl mx-auto">
    {toolData.description}
  </p>

</div>

    {/* 🔹 TOOL SECTION */}
    <div className="max-w-4xl mx-auto px-4">

      <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700">
        {ToolComponent ? <ToolComponent /> : "Tool coming soon."}
      </div>

      {/* 🔹 RELATED TOOLS */}
      <div className="mt-10"> {/* ✅ IMPORTANT FIX */}

        {tools.filter(
          (t) =>
            t.category === toolData.category &&
            t.slug !== toolData.slug
        ).length > 0 && (
          <>
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Related Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools
                .filter(
                  (t) =>
                    t.category === toolData.category &&
                    t.slug !== toolData.slug
                )
                .slice(0, 6)
                .map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transition hover:-translate-y-1 hover:shadow-lg border border-slate-700"
                  >
                    <h3 className="font-medium">
                      {tool.title}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {tool.description}
                    </p>
                  </Link>
                ))}
            </div>
          </>
        )}

      </div>

    </div>

  </div>
)
}