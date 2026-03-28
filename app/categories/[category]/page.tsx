import { tools } from "@/lib/tools"
import Link from "next/link"

export default async function CategoryPage({
  params,
}: {
  params: any
}) {

  const category =
    typeof params?.then === "function"
      ? (await params).category
      : params?.category

  const categorySlug = (category || "").toLowerCase()

  const categoryTools = tools.filter(
    (tool) => tool.category?.toLowerCase() === categorySlug
  )

  const title =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)



  return (

  <main className="min-h-screen 
    bg-gray-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
    text-black dark:text-white px-6 py-20">

    <div className="max-w-6xl mx-auto">

      {/* HEADER */}

      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
        {title} Tools
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
        Explore our collection of free {title.toLowerCase()} tools.
        These tools help you perform tasks quickly online without installing any software.
      </p>

      {/* TOOLS GRID */}

      {categoryTools.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          {categoryTools.map((tool) => (

            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block w-full 
                bg-white dark:bg-gray-900 
                border border-gray-200 dark:border-gray-800
                hover:shadow-lg 
                p-6 rounded-xl transition h-full"
            >

              <h2 className="text-lg font-semibold text-black dark:text-white mb-2">
                {tool.title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 min-h-[40px]">
                {tool.description}
              </p>

            </Link>

          ))}

        </div>

      ) : (

        <div className="text-gray-600 dark:text-gray-400 mb-8">
          No tools available in this category yet. New tools coming soon.
        </div>

      )}

      {/* SEO CONTENT */}

      <div className="max-w-3xl space-y-6 text-gray-700 dark:text-gray-300 mt-10">

        <h2 className="text-2xl font-semibold text-black dark:text-white">
          What are {title} Tools?
        </h2>

        <p>
          {title} tools are online utilities designed to help users complete tasks quickly and efficiently.
          These tools run directly in your browser, meaning you don't need to install any software.
        </p>

        <p>
          CreatorTools provides free {title.toLowerCase()} utilities that are easy to use and accessible from any device.
        </p>

        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Why use online {title.toLowerCase()} tools?
        </h2>

        <ul className="list-disc ml-6 space-y-2">

          <li>No installation required</li>
          <li>Works on desktop and mobile</li>
          <li>Fast and easy to use</li>
          <li>Completely free</li>

        </ul>

      </div>

    </div>

  </main>

)
}