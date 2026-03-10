"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function PasswordGenerator() {

  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let result = "";

    for (let i = 0; i < 12; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(result);
  };

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure random passwords instantly."
    >

      <button
        onClick={generatePassword}
        className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg mb-6"
      >
        Generate Password
      </button>

      {password && (
        <div className="bg-white text-black p-4 rounded-lg">
          {password}
        </div>
      )}

    </ToolLayout>
  );
}