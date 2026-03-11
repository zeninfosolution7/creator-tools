"use client";

import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
title: string
description: string
icon?: LucideIcon
gradientFrom: string
gradientTo: string
}

export default function CategoryCard({
  title,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
}: CategoryCardProps) {
  return (
    <div
      className={`
      relative overflow-hidden rounded-2xl p-6
      border border-white/10
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl
      bg-gradient-to-br ${gradientFrom} ${gradientTo}
      `}
    >

      {/* Wave pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* large gradient wave */}
        <div
          className="absolute w-[140%] h-[140%] right-[-20%] bottom-[-40%]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.06) 45%, transparent 60%)",
            transform: "rotate(12deg)",
          }}
        />

        {/* second wave */}
        <div
          className="absolute w-[140%] h-[140%] right-[-30%] bottom-[-55%]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 35%, transparent 60%)",
            transform: "rotate(12deg)",
          }}
        />

        {/* thin arc line */}
        <div
          className="absolute w-[150%] h-[150%] right-[-35%] bottom-[-60%]"
          style={{
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.25)",
            transform: "rotate(12deg)",
          }}
        />

      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* icon */}
        {/* icon placeholder */}
		{/* icon */}
<div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/10 mb-4">
  {Icon ? (
    <Icon className="w-6 h-6 text-white" />
  ) : (
    <div className="w-6 h-6 bg-white/40 rounded"></div>
  )}
</div>

        {/* title */}
        <h3 className="text-xl font-semibold text-white mb-2">
          {title}
        </h3>

        {/* description */}
        <p className="text-sm text-white/90 leading-relaxed">
          {description}
        </p>

      </div>

    </div>
  );
}