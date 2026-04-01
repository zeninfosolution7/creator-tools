"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";

export default function UnlockPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [needsPassword, setNeedsPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unlockedPdfUrl, setUnlockedPdfUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processPDF = async (selectedFile: File, userPassword?: string) => {
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    
    // Explicitly append password if provided
    if (userPassword) {
      formData.append("password", userPassword);
    }

    try {
      const response = await fetch("/api/unlock-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        
        if (response.status === 401 && data.error === "USER_PASSWORD_REQUIRED") {
          setNeedsPassword(true);
          if (userPassword) {
            setError("Incorrect password. Please try again.");
          }
          setIsProcessing(false);
          return;
        }
        
        throw new Error(data.message || "Failed to process the PDF.");
      }

      // Success: Create a blob URL for download
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setUnlockedPdfUrl(url);
      setNeedsPassword(false);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      resetState();
      setFile(selectedFile);
      // Automatically attempt to unlock (strips Owner Password instantly)
      await processPDF(selectedFile);
    } else if (selectedFile) {
      setError("Please select a valid PDF file.");
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      resetState();
      setFile(droppedFile);
      // Automatically attempt to unlock
      await processPDF(droppedFile);
    } else if (droppedFile) {
      setError("Please drop a valid PDF file.");
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleManualUnlock = async () => {
    if (!file) return;
    await processPDF(file, password);
  };

  const handleDownload = () => {
    if (!unlockedPdfUrl || !file) return;
    const a = document.createElement("a");
    a.href = unlockedPdfUrl;
    a.download = file.name.replace(".pdf", "-unlocked.pdf");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetState = () => {
    setFile(null);
    setPassword("");
    setError(null);
    setNeedsPassword(false);
    setUnlockedPdfUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* 1. Header Section */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Unlock PDF
      </h1>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-center">
        Remove restrictions and unlock protected PDF files automatically.
      </p>

      {/* 2. The Interactive Tool */}
      <div className="card card-padding max-w-3xl mx-auto mt-8">
        {!unlockedPdfUrl ? (
          <div className="space-y-6">
            
            {/* Drag & Drop Zone */}
            {!file && (
              <div 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Drag & drop your PDF here</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">or click to browse files</p>
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}

            {file && !needsPassword && isProcessing && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300 font-medium animate-pulse">
                  Analyzing and removing restrictions...
                </p>
              </div>
            )}

            {file && needsPassword && (
              <div className="animate-fade-in space-y-4">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate pr-4">{file.name}</span>
                  <button onClick={resetState} className="text-sm text-red-500 hover:text-red-700">Remove</button>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md text-sm border border-yellow-200 dark:border-yellow-900/50">
                  <span className="font-semibold block mb-1">Strict Encryption Detected</span>
                  This file is locked with a "User Password" preventing it from being opened. You must enter the password to decrypt it.
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Document Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter the password to open this file"
                    className="input w-full"
                    disabled={isProcessing}
                  />
                </div>
                
                <button
                  onClick={handleManualUnlock}
                  disabled={!password || isProcessing}
                  className="btn-brand mx-auto block w-full md:w-auto mt-4"
                >
                  {isProcessing ? "Decrypting..." : "Unlock PDF"}
                </button>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm mt-4">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium mt-6 mb-3 text-gray-800 dark:text-gray-100">
              PDF Unlocked Successfully!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              All editing, printing, and copying restrictions have been completely removed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={handleDownload} className="btn-brand mx-auto">
                Download Unlocked PDF
              </button>
              <button
                onClick={resetState}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Unlock Another
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. In-Depth SEO Description */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        What is the Unlock PDF Tool?
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        The Unlock PDF tool by CreatorTools is an advanced utility designed to automatically remove password protection and editing restrictions from your PDF documents. If you have a file that restricts printing, editing, or copying text, our server-side processing instantly strips those permissions the moment you upload it.
      </p>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        Unlike basic tools, our application distinguishes between permission locks and strict encryption. We bypass standard owner passwords automatically, providing a seamless experience. We only request a password if the file is cryptographically locked and cannot be read without one.
      </p>

      {/* 4. Features / How to Use */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        How to Use This Tool
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
        <li>Drag and drop your PDF file into the upload zone, or click to select a file from your device.</li>
        <li>The tool will automatically analyze the file. If it only contains standard printing and copying restrictions (Owner Passwords), it will bypass them instantly without asking for a password.</li>
        <li>If the document features strict Open Encryption (a User Password required to open the file), you will be prompted to enter it to decrypt the file.</li>
        <li>Click "Download Unlocked PDF" to save a completely restriction-free version of your document.</li>
      </ul>

      {/* 5. Interactive FAQ Section (Accordion) */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-gray-100">
        Frequently Asked Questions
      </h2>
      
      <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
        <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
          <span>Do I need to know the password to unlock my PDF?</span>
          <span className="transition group-open:rotate-180">
            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Most of the time, no. If the PDF just prevents you from copying text or printing (an "Owner Password"), our tool bypasses this automatically. However, if the PDF cannot even be opened without a password (a "User Password"), you will need to provide that password to decrypt the file.
        </p>
      </details>

      <details className="group border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
        <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800 dark:text-gray-200">
          <span>Are my files safe during this process?</span>
          <span className="transition group-open:rotate-180">
            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Yes. Your file is processed securely on our servers solely for the purpose of removing restrictions. The file is held in the temporary directory during the active process and is immediately deleted once the operation completes.
        </p>
      </details>

      {/* 6. SEO Keywords */}
      <div className="mt-12 text-sm text-gray-400 text-center">
        unlock PDF, remove PDF restrictions, bypass owner password, free PDF unlocker, decrypt PDF, remove print protection, PDF password remover
      </div>
    </div>
  );
}