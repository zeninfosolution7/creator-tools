import { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  title: string
  description: string
  icon?: LucideIcon
  gradientFrom?: string
  gradientTo?: string
}

export default function CategoryCard({
  title,
  description,
  icon: Icon,
  gradientFrom = "from-purple-500",
  gradientTo = "to-indigo-500",
}: CategoryCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-[1px]
        bg-gradient-to-r ${gradientFrom} ${gradientTo}
        hover:scale-[1.02] transition-all duration-300
      `}
    >
      <div className="relative h-full w-full rounded-2xl bg-slate-900/80 backdrop-blur-xl p-6">

        <div
          className={`
            absolute -top-10 -right-10 w-40 h-40
            bg-gradient-to-r ${gradientFrom} ${gradientTo}
            opacity-30 blur-3xl
          `}
        />

        <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 mb-4">
          {Icon ? (
            <Icon className="w-6 h-6 text-white" />
          ) : (
            <span className="text-white text-lg">🔧</span>
          )}
        </div>

        <h3 className="relative z-10 text-lg font-semibold text-white mb-2">
          {title}
        </h3>

        <p className="relative z-10 text-sm text-gray-300 leading-relaxed">
          {description}
        </p>

        <svg
          className="absolute bottom-0 right-0 opacity-20"
          width="200"
          height="120"
          viewBox="0 0 200 120"
          fill="none"
        >
          <path
            d="M0 100 Q80 40 160 100 T320 100"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M0 80 Q80 20 160 80 T320 80"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  )
}