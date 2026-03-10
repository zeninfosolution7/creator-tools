export default function ToolLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-12 text-white">

      <div className="max-w-3xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          {title}
        </h1>

        <p className="text-gray-400 mb-10">
          {description}
        </p>

        <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700">
          {children}
        </div>

      </div>

    </div>
  );
}