export default function ToolLayout({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white px-6 pt-12 pb-20">

      <div className="max-w-4xl mx-auto text-center">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          {description}
        </p>

        {/* TOOL CARD */}
        <div className="card card-padding shadow-sm">
          {children}
        </div>

      </div>

    </main>
  )
}