"use client";

import React, { useState, useEffect } from "react";

export default function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [removeHyphens, setRemoveHyphens] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate initial UUID on mount
  useEffect(() => {
    generateUuids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateUuids = (): void => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      // Using native browser crypto API for zero-compute v4 UUID generation
      let uuid: string = crypto.randomUUID();
      
      if (removeHyphens) {
        uuid = uuid.replace(/-/g, "");
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      
      newUuids.push(uuid);
    }
    setUuids(newUuids);
    setCopied(false);
  };

  const handleCopy = async (): Promise<void> => {
    if (uuids.length === 0) return;
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      
      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="count" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of UUIDs
          </label>
          <input
            id="count"
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col justify-center space-y-3 mt-4 md:mt-0">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUppercase(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Uppercase</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={removeHyphens}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRemoveHyphens(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Remove Hyphens</span>
          </label>
        </div>

        <div className="flex items-end">
          <button
            onClick={generateUuids}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated UUID(s)</h3>
          <button
            onClick={handleCopy}
            className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${
              copied
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
            }`}
          >
            {copied ? "Copied!" : "Copy All"}
          </button>
        </div>
        
        <textarea
          readOnly
          value={uuids.join("\n")}
          rows={Math.min(10, Math.max(3, uuids.length))}
          className="w-full p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Generated UUIDs"
        />
      </div>
    </div>
  );
}