"use client";

import React, { useState, useEffect, useCallback } from "react";

type TimeUnit = "seconds" | "milliseconds";

interface TimeData {
  local: string;
  utc: string;
  iso: string;
  relative: string;
  isValid: boolean;
}

export default function TimestampConverterTool() {
  const [inputValue, setInputValue] = useState<string>("");
  const [unit, setUnit] = useState<TimeUnit>("seconds");
  const [timeData, setTimeData] = useState<TimeData>({
    local: "",
    utc: "",
    iso: "",
    relative: "",
    isValid: false,
  });

  const calculateRelativeTime = (targetDate: Date, now: Date): string => {
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (Math.abs(diffInSeconds) < 60) return rtf.format(-diffInSeconds, "second");
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (Math.abs(diffInMinutes) < 60) return rtf.format(-diffInMinutes, "minute");
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (Math.abs(diffInHours) < 24) return rtf.format(-diffInHours, "hour");
    const diffInDays = Math.floor(diffInHours / 24);
    if (Math.abs(diffInDays) < 30) return rtf.format(-diffInDays, "day");
    const diffInMonths = Math.floor(diffInDays / 30);
    if (Math.abs(diffInMonths) < 12) return rtf.format(-diffInMonths, "month");
    const diffInYears = Math.floor(diffInDays / 365);
    return rtf.format(-diffInYears, "year");
  };

  const processTimestamp = useCallback((value: string, currentUnit: TimeUnit) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      setTimeData({ local: "", utc: "", iso: "", relative: "", isValid: false });
      return;
    }

    const date = new Date(currentUnit === "seconds" ? parsedValue * 1000 : parsedValue);

    if (isNaN(date.getTime())) {
      setTimeData({ local: "", utc: "", iso: "", relative: "", isValid: false });
      return;
    }

    setTimeData({
      local: date.toLocaleString(),
      utc: date.toUTCString(),
      iso: date.toISOString(),
      relative: calculateRelativeTime(date, new Date()),
      isValid: true,
    });
  }, []);

  useEffect(() => {
    if (inputValue) {
      processTimestamp(inputValue, unit);
    } else {
      setTimeData({ local: "", utc: "", iso: "", relative: "", isValid: false });
    }
  }, [inputValue, unit, processTimestamp]);

  const handleGetCurrentTime = () => {
    const now = new Date().getTime();
    const value = unit === "seconds" ? Math.floor(now / 1000) : now;
    setInputValue(value.toString());
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Input Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="timestamp-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unix Timestamp
            </label>
            <input
              id="timestamp-input"
              type="number"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              placeholder="e.g., 1711894285"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex items-end gap-2">
            <select
              title="Time Unit"
              value={unit}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUnit(e.target.value as TimeUnit)}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="seconds">Seconds (s)</option>
              <option value="milliseconds">Milliseconds (ms)</option>
            </select>
            <button
              onClick={handleGetCurrentTime}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Current Time
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Converted Results</h3>
          
          {inputValue === "" ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm italic">Enter a timestamp to see conversions.</p>
          ) : !timeData.isValid ? (
            <p className="text-red-500 dark:text-red-400 text-sm">Invalid timestamp format.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <ResultRow label="Local Time" value={timeData.local} onCopy={() => copyToClipboard(timeData.local)} />
              <ResultRow label="UTC Time" value={timeData.utc} onCopy={() => copyToClipboard(timeData.utc)} />
              <ResultRow label="ISO 8601" value={timeData.iso} onCopy={() => copyToClipboard(timeData.iso)} />
              <ResultRow label="Relative" value={timeData.relative} onCopy={() => copyToClipboard(timeData.relative)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-grow">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
          {label}
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 break-all">
          {value}
        </span>
      </div>
      <button
        onClick={onCopy}
        className="mt-2 sm:mt-0 text-xs font-medium px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded transition-colors"
      >
        Copy
      </button>
    </div>
  );
}