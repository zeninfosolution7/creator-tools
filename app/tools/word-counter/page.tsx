"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function WordCounter() {

  const [text, setText] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words and characters instantly."
    >

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here..."
        className="w-full h-40 px-4 py-3 mb-6 rounded-lg border border-slate-500 bg-white text-black"
      />

      <div className="bg-white text-black p-4 rounded-lg space-y-2">
        <p><strong>Words:</strong> {wordCount}</p>
        <p><strong>Characters:</strong> {charCount}</p>
      </div>

    </ToolLayout>
  );
}