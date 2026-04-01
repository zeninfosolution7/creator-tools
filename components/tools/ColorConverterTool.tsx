"use client";

import React, { useState, useEffect } from "react";

export default function ColorConverterTool() {
  const [hex, setHex] = useState<string>("#3b82f6");
  const [rgb, setRgb] = useState<string>("rgb(59, 130, 246)");
  const [hsl, setHsl] = useState<string>("hsl(217, 90%, 60%)");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // --- Utility Functions ---
  const copyToClipboard = async (text: string, format: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // --- Conversion Logic ---
  const parseHex = (val: string): { r: number; g: number; b: number } | null => {
    let cleanHex = val.replace("#", "").trim();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map((c) => c + c).join("");
    }
    const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    return match
      ? {
          r: parseInt(match[1], 16),
          g: parseInt(match[2], 16),
          b: parseInt(match[3], 16),
        }
      : null;
  };

  const parseRgb = (val: string): { r: number; g: number; b: number } | null => {
    const match = val.match(/rgba?\(?\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)?/i) || 
                  val.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/);
    if (match) {
      return {
        r: Math.min(255, Math.max(0, parseInt(match[1], 10))),
        g: Math.min(255, Math.max(0, parseInt(match[2], 10))),
        b: Math.min(255, Math.max(0, parseInt(match[3], 10))),
      };
    }
    return null;
  };

  const parseHsl = (val: string): { h: number; s: number; l: number } | null => {
    const match = val.match(/hsla?\(?\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)?/i) || 
                  val.match(/^(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?$/);
    if (match) {
      return {
        h: Math.min(360, Math.max(0, parseInt(match[1], 10))),
        s: Math.min(100, Math.max(0, parseInt(match[2], 10))),
        l: Math.min(100, Math.max(0, parseInt(match[3], 10))),
      };
    }
    return null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (c: number) => {
      const h = Math.round(c).toString(16);
      return h.length === 1 ? "0" + h : h;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // --- Handlers ---
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setHex(val);
    const parsed = parseHex(val);
    if (parsed) {
      setRgb(`rgb(${parsed.r}, ${parsed.g}, ${parsed.b})`);
      const hslVal = rgbToHsl(parsed.r, parsed.g, parsed.b);
      setHsl(`hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`);
    }
  };

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setRgb(val);
    const parsed = parseRgb(val);
    if (parsed) {
      setHex(rgbToHex(parsed.r, parsed.g, parsed.b));
      const hslVal = rgbToHsl(parsed.r, parsed.g, parsed.b);
      setHsl(`hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`);
    }
  };

  const handleHslChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setHsl(val);
    const parsed = parseHsl(val);
    if (parsed) {
      const rgbVal = hslToRgb(parsed.h, parsed.s, parsed.l);
      setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
      setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      {/* Color Preview */}
      <div 
        className="w-full h-40 rounded-lg shadow-inner mb-8 transition-colors duration-300 border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: parseHex(hex) ? hex : "#ffffff" }}
      />

      {/* Inputs Grid */}
      <div className="space-y-6">
        {/* HEX Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label className="w-20 font-semibold text-gray-700 dark:text-gray-300">HEX</label>
          <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              value={hex}
              onChange={handleHexChange}
              placeholder="#FFFFFF"
              className="flex-1 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 outline-none"
            />
            <button
              onClick={() => copyToClipboard(hex, "hex")}
              className="p-3 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Copy HEX"
            >
              {copiedFormat === "hex" ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>

        {/* RGB Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label className="w-20 font-semibold text-gray-700 dark:text-gray-300">RGB</label>
          <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              value={rgb}
              onChange={handleRgbChange}
              placeholder="rgb(255, 255, 255)"
              className="flex-1 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 outline-none"
            />
            <button
              onClick={() => copyToClipboard(rgb, "rgb")}
              className="p-3 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Copy RGB"
            >
              {copiedFormat === "rgb" ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>

        {/* HSL Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label className="w-20 font-semibold text-gray-700 dark:text-gray-300">HSL</label>
          <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              value={hsl}
              onChange={handleHslChange}
              placeholder="hsl(0, 0%, 100%)"
              className="flex-1 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 outline-none"
            />
            <button
              onClick={() => copyToClipboard(hsl, "hsl")}
              className="p-3 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Copy HSL"
            >
              {copiedFormat === "hsl" ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Inline Icons for zero-dependencies ---
function CopyIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-green-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}