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
    <main className="min-h-screen bg-slate-900 text-white px-6 pt-12 pb-20">

      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          {title}
        </h1>

        <p className="text-gray-400 mb-10">
          {description}
        </p>

        <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl shadow-xl">
          {children}
        </div>

      </div>

    </main>
  )
}