"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

export default function ImageCompressorPage() {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(0.8);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [activeBlob, setActiveBlob] = useState<Blob | null>(null);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [originalUrl, compressedUrl]);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    
    setSelectedFileName(file.name);
    setOriginalSize(file.size);
    setOriginalUrl(URL.createObjectURL(file));
    setCompressedUrl(null);
    setCompressedSize(0);
    setIsCompressing(true);

    let processableBlob: Blob = file;

    // Zero-Compute HEIC Conversion
    if (file.name.toLowerCase().endsWith(".heic") || file.type === "image/heic") {
      try {
        const heic2any = (await import("heic2any")).default;
        const converted = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 1, // Keep initial conversion high, compress via canvas next
        });
        processableBlob = Array.isArray(converted) ? converted[0] : converted;
      } catch (error) {
        console.error("HEIC conversion failed:", error);
        alert("Failed to process HEIC file. Please try another image.");
        setIsCompressing(false);
        return;
      }
    }

    setActiveBlob(processableBlob);
    processImage(processableBlob, quality);
  };

  const handleQualityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseFloat(e.target.value);
    setQuality(newQuality);
    if (activeBlob) {
      processImage(activeBlob, newQuality);
    }
  };

  const processImage = (blob: Blob, qual: number) => {
    setIsCompressing(true);
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsCompressing(false);
        return;
      }
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Compress to blob
      canvas.toBlob(
        (newBlob) => {
          if (newBlob) {
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            setCompressedUrl(URL.createObjectURL(newBlob));
            setCompressedSize(newBlob.size);
          }
          setIsCompressing(false);
        },
        "image/jpeg",
        qual
      );
    };
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Image Compressor
      </h1>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-center">
        Reduce image file sizes instantly—including HEIC format—right in your browser without losing quality.
      </p>

      {/* 2. The Interactive Tool */}
      <div className="card card-padding max-w-3xl mx-auto mb-12">
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Image (JPEG, PNG, WebP, HEIC)
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp, image/heic, .heic"
              onChange={handleFileChange}
              className="input w-full"
            />
          </div>

          {selectedFileName && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Compression Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={handleQualityChange}
                  disabled={isCompressing}
                  className="w-full cursor-pointer accent-blue-600 disabled:opacity-50"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Lower quality = smaller file size. Higher quality = better visual fidelity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Original Size</span>
                  <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {formatBytes(originalSize)}
                  </span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Compressed Size</span>
                  <span className="text-xl font-semibold text-green-600 dark:text-green-400">
                    {isCompressing ? "Processing..." : formatBytes(compressedSize)}
                  </span>
                  {!isCompressing && compressedSize > 0 && (
                    <span className="block text-xs text-green-500 mt-1">
                      {Math.round((1 - compressedSize / originalSize) * 100)}% smaller
                    </span>
                  )}
                </div>
              </div>

              {compressedUrl && !isCompressing && (
                <div className="mt-6 flex justify-center">
                  <a
                    href={compressedUrl}
                    download={`compressed_${selectedFileName.replace(/\.[^/.]+$/, "")}.jpg`}
                    className="btn-brand mx-auto px-8 py-3 rounded-lg text-white font-medium transition-colors text-center"
                  >
                    Download Compressed Image
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 3. In-Depth SEO Description */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        What is the Image Compressor?
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        The Image Compressor is a powerful, zero-compute web utility designed to significantly reduce the file size of your photographs and graphics. Heavy images can slow down website loading times, consume excessive bandwidth, and eat up valuable storage space. By utilizing smart compression algorithms, this tool shrinks your files while maintaining an optimal balance of visual fidelity.
      </p>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        Built with privacy and performance in mind, our compressor processes every image entirely within your web browser. This includes complex formats like iPhone HEIC files, which are securely converted and compressed without ever leaving your device. This client-side architecture guarantees lightning-fast processing and 100% security for web developers, designers, and everyday users.
      </p>

      {/* 4. Features / How to Use */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        How to Use This Tool
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
        <li>Click the file input area to browse and upload an image from your device (supports JPEG, PNG, WebP, and iPhone HEIC files).</li>
        <li>The tool will automatically generate a compressed preview based on the default quality settings. HEIC files will be converted to universally supported JPEGs.</li>
        <li>Use the <strong>Compression Quality</strong> slider to fine-tune the output. Slide left for a smaller file size or right to retain maximum detail.</li>
        <li>Review the real-time size comparison to see exactly how much space you are saving.</li>
        <li>Click the <strong>Download Compressed Image</strong> button to save the optimized file securely to your device.</li>
      </ul>

      {/* 5. Interactive FAQ Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        Frequently Asked Questions
      </h2>
      
      <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
        <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
          How do you handle HEIC files securely?
          <span className="transition group-open:rotate-180">
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          We use a specialized client-side decoding library to read HEIC files directly inside your browser. The file is mapped into your local memory, converted to a standard format, and compressed. Nothing is ever uploaded to a server, keeping your personal iPhone photos entirely private.
        </p>
      </details>

      <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
        <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
          Are my images uploaded to your servers?
          <span className="transition group-open:rotate-180">
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          No. This tool is built using a "Zero-Compute" architecture. Your images are processed entirely on your own device using the HTML5 Canvas API within your browser. No files are ever uploaded or saved to external servers, ensuring complete privacy.
        </p>
      </details>

      <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
        <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
          Why does the output format change to JPEG?
          <span className="transition group-open:rotate-180">
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          JPEG is an industry standard for lossy compression and offers the most efficient file size reduction for photographs and complex graphics in web browsers. Formats like HEIC or transparent PNGs are standardized to JPEG to ensure maximum compatibility and compression.
        </p>
      </details>

      {/* 6. SEO Keywords */}
      <div className="mt-12 text-sm text-gray-400 text-center">
        image compressor, compress images online, convert heic to jpeg, reduce photo size, client-side heic compression, zero-compute tools, secure image optimization, web performance
      </div>
    </main>
  );
}