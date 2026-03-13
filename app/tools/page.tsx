import CategoryCard from "@/components/CategoryCard"
import { tools } from "@/lib/tools"
import Link from "next/link"

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-12">
          All Tools
        </h1>

      <div className="grid md:grid-cols-3 gap-6">

  {tools.map((tool) => (

    <Link key={tool.slug} href={`/tools/${tool.slug}`}>

      <CategoryCard
        title={tool.title}
        description={tool.description}
        icon={tool.icon}
        gradientFrom={tool.gradientFrom}
        gradientTo={tool.gradientTo}
      />

    </Link>

  ))}

</div>

    </div>
	</main>
  )
}