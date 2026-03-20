export default function FormRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">

      {/* LABEL */}
      <label className="w-40 text-sm md:text-base text-slate-300 flex items-center">
        {label}
      </label>

      {/* INPUT */}
      <div className="flex-1">
        {children}
      </div>

    </div>
  )
}