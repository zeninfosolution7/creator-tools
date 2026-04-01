"use client";

import React, { useState, useRef, useEffect } from 'react';

const URLEncoderTool: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  // Notification state
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEncode = (): void => {
    try {
      setError('');
      // Using encodeURIComponent for modern, safe encoding
      setOutput(encodeURIComponent(input));
    } catch (err) {
      setError('Invalid input for encoding.');
    }
  };

  const handleDecode = (): void => {
    try {
      setError('');
      // Using decodeURIComponent to reverse encoding
      setOutput(decodeURIComponent(input));
    } catch (err) {
      setError('Invalid URI sequence. Check your input formatting.');
    }
  };

  const copyToClipboard = async (): Promise<void> => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      
      // Clear existing timeout if user clicks rapidly
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      
      // Trigger green animated notification
      setShowNotification(true);
      
      // Hide notification after 3 seconds
      notificationTimeoutRef.current = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optional: Handle copy error here if needed
    }
  };

  const clearAll = (): void => {
    setInput('');
    setOutput('');
    setError('');
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      
      {/* Copied Notification (Green, Animated) */}
      <div 
        className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 dark:bg-emerald-700 text-white shadow-lg 
                    transition-all duration-300 ease-out transform
                    ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}
        style={{ width: 'auto' }} // Ensure width fits content
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="font-semibold text-sm">Copied to clipboard!</span>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Enter URL or Text
          </label>
          <textarea
            className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Paste your URL or text here..."
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleEncode}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Encode
          </button>
          <button
            onClick={handleDecode}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            Decode
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Clear
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md text-sm border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {/* Output Section */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Result
          </label>
          <div className="relative">
            <textarea
              readOnly
              className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white cursor-default"
              value={output}
              placeholder="Result will appear here..."
            />
            {output && (
              <button
                onClick={copyToClipboard}
                className="absolute top-3 right-3 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                Copy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLEncoderTool;