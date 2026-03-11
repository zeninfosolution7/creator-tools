import React, { type ComponentType } from "react";
import ToolLayout from "@/components/ToolLayout";
import YoutubeThumbnailTool from "@/components/tools/YoutubeThumbnailTool";
import { getToolBySlug, type ToolComponentId } from "@/lib/tools";
import { notFound } from "next/navigation";

type ToolPageProps = {
  params: Promise<{
    tool: string;
  }>;
};

const componentMap: Record<ToolComponentId, ComponentType> = {
  YoutubeThumbnailTool,
};

export default function ToolPage({ params }: ToolPageProps) {
  const { tool: slug } = React.use(params);

  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = componentMap[tool.component];

  if (!ToolComponent) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <ToolLayout title={tool.title} description={tool.description}>
        <ToolComponent />
      </ToolLayout>
    </main>
  );
}

