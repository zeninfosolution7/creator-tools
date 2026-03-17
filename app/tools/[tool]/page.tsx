import { getToolBySlug, tools } from "@/lib/tools"
import { notFound } from "next/navigation"
import { toolComponents } from "@/lib/toolComponents"
import Link from "next/link"

import ToolLayout from "@/components/ToolLayout"
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

if (!toolData) {
  return notFound()
}

const ToolComponent =
  toolComponents[toolData.component as keyof typeof toolComponents]
  
console.log("tool slug:", tool)
console.log("tool object:", toolData)
console.log("component:", toolData.component)
  
return (
  <>
    {/* Breadcrumb */}
    <div className="bg-slate-900">
      <div className="max-w-3xl mx-auto px-6 pt-6 pb-2">
        <Breadcrumb
          category={toolData.category}
          toolTitle={toolData.title}
        />
      </div>
    </div>

    {/* Tool Layout */}
    <ToolLayout
      title={toolData.title}
      description={toolData.description}
    >
      {/* Tool UI */}
      {ToolComponent ? <ToolComponent /> : "Tool coming soon."}

      {/* Related Tools */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Tools</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="font-semibold">{tool.title}</h3>
                <p className="text-sm text-gray-400">
                  {tool.description}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </ToolLayout>
  </>
)
}