"use client"

import { useState } from "react"
import { PDFDocument } from "pdf-lib"

export default function PdfUnlockTool() {

  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState("")

  async function unlockPdf() {

    if (!file) {
      setStatus("Please upload a PDF file.")
      return
    }

    try {

      setStatus("Processing PDF...")

      const arrayBuffer = await file.arrayBuffer()

      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true
      })

      const newPdf = await PDFDocument.create()

      const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())

      pages.forEach((page) => newPdf.addPage(page))

      const bytes = await newPdf.save()

      const blob = new Blob([bytes.buffer], { type: "application/pdf" })

      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "unlocked.pdf"
      a.click()

      setStatus("PDF unlocked successfully.")

    } catch (error) {

      setStatus("This PDF is strongly encrypted and cannot be unlocked without the password.")

    }
  }

  return (

    <div className="space-y-6">

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full p-3 rounded bg-slate-700 text-white"
      />

      <button
        onClick={unlockPdf}
        className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded text-white"
      >
        Unlock PDF
      </button>

      {status && (
        <p className="text-gray-300">
          {status}
        </p>
      )}

      {/* SEO CONTENT */}

      <div className="mt-10 text-gray-300 space-y-4">

        <h2 className="text-xl font-semibold text-white">
          Unlock PDF Online
        </h2>

        <p>
          This free tool removes editing, printing and copying restrictions
          from PDF files. Upload your restricted PDF and download an unlocked
          version instantly.
        </p>

        <p>
          Files are processed directly in your browser, ensuring complete
          privacy and security. No file uploads are required.
        </p>

      </div>

    </div>
  )
}