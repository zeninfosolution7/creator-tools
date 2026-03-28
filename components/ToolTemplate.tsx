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
      
      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text..."
        className="input h-40 mb-6"
      />

      {/* RESULT */}
      <div className="card p-4 text-center">
        Result will appear here
      </div>

    </ToolLayout>
  );
}