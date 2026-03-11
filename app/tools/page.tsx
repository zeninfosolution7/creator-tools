import Link from "next/link"
import CategoryCard from "@/components/CategoryCard"
import { tools } from "@/lib/tools"

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">
        All Tools
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <CategoryCard
              title={tool.title}
              description={tool.description}
              gradientFrom={tool.gradientFrom}
              gradientTo={tool.gradientTo}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}