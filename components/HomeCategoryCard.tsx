import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface HomeCategoryCardProps {
  title: string
  description: string
  icon?: LucideIcon
  colorFrom?: string
  colorTo?: string
  href: string
}

export default function HomeCategoryCard({
  title,
  description,
  icon: Icon,
  colorFrom = "from-purple-500",
  colorTo = "to-indigo-500",
  href,
}: HomeCategoryCardProps) {

  return (

    <Link href={href} className="h-full">

  <div
    className={`
      relative h-full flex flex-col justify-between
      overflow-hidden rounded-2xl p-6
      bg-gradient-to-br ${colorFrom} ${colorTo}
      hover:scale-[1.03] transition-all duration-300
      shadow-lg cursor-pointer
    `}
  >

    <div>

      <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur">
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-white/80 min-h-[48px]">
        {description}
      </p>

    </div>

    <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

  </div>

</Link>

  )
}