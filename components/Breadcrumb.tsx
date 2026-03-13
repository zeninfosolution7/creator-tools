import Link from "next/link"

interface BreadcrumbProps {
  category?: string
  toolTitle?: string
}

export default function Breadcrumb({ category, toolTitle }: BreadcrumbProps) {

  const categoryTitle =
    category?.charAt(0).toUpperCase() + category?.slice(1)

  return (

    <nav className="text-sm text-gray-400 mb-2">

      <Link href="/" className="hover:text-white">
        Home
      </Link>

      {category && (
        <>
          <span className="mx-2">›</span>

          <Link
            href={`/categories/${category}`}
            className="hover:text-white"
          >
            {categoryTitle} Tools
          </Link>
        </>
      )}

      {toolTitle && (
        <>
          <span className="mx-2">›</span>

          <span className="text-gray-300">
            {toolTitle}
          </span>
        </>
      )}

    </nav>

  )
}