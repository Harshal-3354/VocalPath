import React, { useState } from "react";

const RoleSummarizer = ({ onSummarize }) => {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarizeRole = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const prompt = `Summarize the following job description into 5–8 concise bullet points. Use no extra words:\n\n${input}`;

    try {
      const res = await fetch(
        "http://localhost:5000/api/interview/summarize-role",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      setSummary(data.summary);
      onSummarize(data.summary); // send to App
    } catch (err) {
      console.error("Summarization error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Paste Role Description:
      </label>
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border rounded-lg p-3 text-sm"
        placeholder="Paste full role description here..."
      />

      <button
        onClick={summarizeRole}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Summarizing..." : "Summarize Role"}
      </button>

      {summary && (
        <div className="bg-gray-50 border rounded-lg p-4 text-sm">
          <p className="font-semibold text-gray-700 mb-2">🔍 Summary:</p>
          <pre className="whitespace-pre-wrap">{summary}</pre>
        </div>
      )}
    </div>
  );
};

export default RoleSummarizer;
