import { getToolBySlug, tools } from "@/lib/tools"
import { notFound } from "next/navigation"
import { toolComponents } from "@/lib/toolComponents"
import Link from "next/link"

import Breadcrumb from "@/components/Breadcrumb"
import Container from "@/components/Container"

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

  const relatedTools = tools
    .filter(
      (t) =>
        t.category === toolData.category &&
        t.slug !== toolData.slug
    )
    .slice(0, 6)

  return (
    <Container>

      {/* 🔹 BREADCRUMB */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        <Breadcrumb
          category={toolData.category}
          toolTitle={toolData.title}
        />
      </div>

      {/* 🔹 TITLE */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">
          {toolData.title}
        </h1>

        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          {toolData.description}
        </p>
      </div>
	  
	  <div className="my-6 flex justify-center">
  <div className="w-full max-w-3xl h-[90px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
    Ad
  </div>
</div>

      {/* 🔹 TOOL CARD */}
      <div className="card card-padding shadow-sm">
        {ToolComponent ? <ToolComponent /> : "Tool coming soon."}
      </div>

      {/* 🔹 RELATED TOOLS */}
      {relatedTools.length > 0 && (
        <div className="mt-10">

          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Related Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="card p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-medium">
                  {tool.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>

        </div>
      )}
	 

    </Container>
  )
}