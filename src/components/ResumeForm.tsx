"use client";

import { useState } from "react";

export default function ResumeForm() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOutput("Generating...");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setOutput(data.result || "Error");
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded text-black"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your work experience here..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Generate Resume Text
        </button>
      </form>

      {output && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-line text-black">
          {output}
        </div>
      )}
    </div>
  );
}
