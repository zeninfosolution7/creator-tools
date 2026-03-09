"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");

  const downloadQR = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 py-20">

      <div className="max-w-xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          QR Code Generator
        </h1>

        <p className="text-gray-400 mb-10">
          Generate QR codes instantly for URLs, text or any information.
        </p>

        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="
            w-full
            px-4
            py-3
            mb-8
            rounded-lg
            border
            border-slate-500
            bg-white
            text-black
            placeholder-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {text && (
          <div className="flex flex-col items-center gap-6">

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <QRCodeCanvas value={text} size={220} />
            </div>

            <button
              onClick={downloadQR}
              className="
                bg-blue-600
                hover:bg-blue-500
                px-6
                py-3
                rounded-lg
                font-semibold
              "
            >
              Download QR Code
            </button>

          </div>
        )}

      </div>

    </main>
  );
}