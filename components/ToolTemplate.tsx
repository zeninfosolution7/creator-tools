"use client";

import { useState, useEffect } from "react";
import ToolLayout from "./ToolLayout";

export default function ToolTemplate({
  title,
  description,
}: {
  title: string;
  description: string;
}) {

  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ToolLayout title={title} description={description}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text..."
        className="w-full h-40 px-4 py-3 mb-6 rounded-lg border border-slate-500 bg-white text-black"
      />

      <div className="bg-white text-black p-4 rounded-lg">
        Result will appear here
      </div>
    </ToolLayout>
  );
}