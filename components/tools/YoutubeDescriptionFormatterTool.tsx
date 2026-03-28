"use client";

import React, { useState, useCallback } from "react";

interface ProcessedOutput {
  description: string;
  chapters: string;
  hashtags: string;
}

export default function YoutubeDescriptionFormatterTool() {
  const [inputText, setInputText] = useState("");
  const [enableTimestamps, setEnableTimestamps] = useState(true);
  const [output, setOutput] = useState<ProcessedOutput | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Helper to convert SRT/VTT time (00:00:04,000) to YouTube time (00:04)
  const formatYouTubeTime = (rawTime: string) => {
    // Extract just the HH:MM:SS part, ignoring milliseconds
    const timeMatch = rawTime.match(/(\d{2}):(\d{2}):(\d{2})/);
    if (!timeMatch) return rawTime;

    const [_, hours, minutes, seconds] = timeMatch;
    
    if (hours === "00") {
      return `${minutes}:${seconds}`; // 04:22
    }
    return `${hours}:${minutes}:${seconds}`; // 01:04:22
  };

  const processText = useCallback(() => {
    if (!inputText.trim()) return;

    const rawLines = inputText.split("\n").map(l => l.trim());
    let cleanTextLines: string[] = [];
    let chaptersArray: string[] = [];
    
    // Regex to detect SRT/VTT timestamp lines (e.g., 00:00:04,000 --> 00:00:07,000)
    const arrowTimeRegex = /(\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*\d{2}:\d{2}:\d{2}[,.]\d{3}/;
    // Regex for plain timestamps (e.g., 00:04 or 01:22:33)
    const plainTimeRegex = /^(?:(?:[01]?\d|2[0-3]):)?(?:[0-5]?\d):(?:[0-5]\d)/;

    let i = 0;
    let lastChapterTimeInSeconds = -999;

    while (i < rawLines.length) {
      const line = rawLines[i];

      // Skip lonely SRT index numbers or empty lines
      if (/^\d+$/.test(line) || line.length === 0) {
        i++;
        continue;
      }

      // Check if line is an SRT/VTT timestamp block
      const arrowMatch = line.match(arrowTimeRegex);
      
      if (arrowMatch) {
        const startTime = arrowMatch[1];
        const formattedTime = formatYouTubeTime(startTime);
        
        // The actual spoken text is usually on the next 1-2 lines in SRT
        let spokenText = "";
        let offset = 1;
        while (i + offset < rawLines.length && rawLines[i + offset].length > 0 && !/^\d+$/.test(rawLines[i + offset])) {
          spokenText += rawLines[i + offset] + " ";
          offset++;
        }

        spokenText = spokenText.trim();

        if (spokenText) {
          cleanTextLines.push(spokenText);

          if (enableTimestamps) {
            // Rough logic to prevent chapter spam (only add chapter if > 30 seconds since last)
            const [min, sec] = formattedTime.split(':').slice(-2).map(Number); // rudimentary check
            const currentSeconds = (min * 60) + sec;
            
            if (chaptersArray.length === 0 || (currentSeconds - lastChapterTimeInSeconds) > 30) {
              // Create a meaningful chapter title from the first few words
              const chapterTitle = spokenText.split(" ").slice(0, 5).join(" ").replace(/[.,!?]+$/, "");
              
              // Only add if it doesn't look like filler
              if (!/^(uh|um|so|yeah|and)$/i.test(chapterTitle)) {
                // Ensure first chapter starts at 00:00 for YouTube SEO
                const timeToUse = chaptersArray.length === 0 ? "00:00" : formattedTime;
                chaptersArray.push(`${timeToUse} ${chapterTitle.charAt(0).toUpperCase() + chapterTitle.slice(1)}`);
                lastChapterTimeInSeconds = currentSeconds;
              }
            }
          }
        }
        i += offset; // Skip the text lines we just processed
        continue;
      }

      // Handle plain text formats (not SRT, just pasted transcripts)
      const plainMatch = line.match(plainTimeRegex);
      if (plainMatch) {
        const time = plainMatch[0];
        const text = line.replace(time, "").trim();
        if (text) cleanTextLines.push(text);
        
        if (enableTimestamps && text) {
           chaptersArray.push(`${time} ${text}`);
        }
        i++;
        continue;
      }

      // If it's just plain text, add it to the description body
      cleanTextLines.push(line);
      i++;
    }

    // --- Format the Description ---
    let descriptionText = cleanTextLines.join(" ").replace(/\s{2,}/g, " ");
    descriptionText = descriptionText.replace(/\s+([.,!?])/g, "$1");

    // Group into readable paragraphs (roughly every 3 sentences)
    const sentences = descriptionText.match(/[^.!?]+[.!?]+/g) || [descriptionText];
    let paragraphs: string[] = [];
    let currentParagraph = "";

    sentences.forEach((sentence, index) => {
      currentParagraph += sentence.trim() + " ";
      if ((index + 1) % 3 === 0 || index === sentences.length - 1) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = "";
      }
    });

    // --- Generate Hashtags ---
    const words = descriptionText.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
    const stopWords = new Set(["the", "and", "this", "that", "with", "from", "your", "what", "when", "where", "have", "they", "will"]);
    const validWords = words.filter((w) => w.length > 4 && !stopWords.has(w));
    
    const uniqueTags = Array.from(new Set(validWords))
      .sort((a, b) => b.length - a.length)
      .slice(0, 6)
      .map((tag) => `#${tag}`);

    setOutput({
      description: paragraphs.join("\n\n"),
      chapters: chaptersArray.slice(0, 12).join("\n"), // Cap at 12 chapters
      hashtags: uniqueTags.join(" "),
    });
  }, [inputText, enableTimestamps]);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT COLUMN: INPUT */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Paste Subtitles or Transcript
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Supports raw SRT files, VTT, or messy copied text. We'll strip the junk.
          </p>
        </div>

        <textarea
          className="w-full h-[350px] p-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none shadow-sm"
          placeholder="1&#10;00:00:04,000 --> 00:00:07,000&#10;In this video we are going to learn...&#10;&#10;2&#10;00:00:07,500 --> 00:00:10,000&#10;How to build a Next.js application."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/80 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          
          {/* Custom Toggle Switch for Timestamps */}
          <label className="flex items-center cursor-pointer gap-3">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={enableTimestamps}
                onChange={(e) => setEnableTimestamps(e.target.checked)}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${enableTimestamps ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enableTimestamps ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Generate Chapters</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Convert times to 00:04 format</span>
            </div>
          </label>

          <button
            onClick={processText}
            disabled={!inputText.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-md transition-colors w-full sm:w-auto"
          >
            Clean Text ✨
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: OUTPUT */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Formatted Output
        </h2>

        {output ? (
          <div className="flex flex-col gap-5">
            <OutputSection
              title="📝 Clean Description"
              content={output.description}
              sectionId="desc"
              copiedSection={copiedSection}
              onCopy={handleCopy}
            />

            {enableTimestamps && output.chapters && (
              <OutputSection
                title="⏱️ YouTube Chapters"
                content={output.chapters}
                sectionId="chapters"
                copiedSection={copiedSection}
                onCopy={handleCopy}
              />
            )}

            <OutputSection
              title="🏷️ Hashtags"
              content={output.hashtags}
              sectionId="hashtags"
              copiedSection={copiedSection}
              onCopy={handleCopy}
            />
          </div>
        ) : (
          <div className="flex-1 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400 p-8 text-center bg-gray-50/50 dark:bg-gray-800/20">
            Awaiting input... Paste your transcript on the left to generate your YouTube-ready description.
          </div>
        )}
      </div>
    </div>
  );
}

function OutputSection({
  title,
  content,
  sectionId,
  copiedSection,
  onCopy,
}: {
  title: string;
  content: string;
  sectionId: string;
  copiedSection: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        <button
          onClick={() => onCopy(content, sectionId)}
          className="text-sm px-3 py-1.5 rounded-md font-medium flex items-center gap-2 transition-all bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          {copiedSection === sectionId ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>
      <div className="p-4">
        <textarea
          readOnly
          className="w-full bg-transparent resize-none focus:outline-none text-gray-700 dark:text-gray-300 min-h-[120px]"
          value={content}
          rows={Math.min(content.split("\n").length, 8)}
        />
      </div>
    </div>
  );
}