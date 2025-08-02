import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownText from "./MarkdownText";

const FormattedResumeModal = ({ resumeText, onClose }) => {
  const [formattedResume, setFormattedResume] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormattedResume = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/interview/format-resume",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText }),
          }
        );

        const data = await res.json();
        setFormattedResume(data.formatted);
      } catch (err) {
        console.error("Failed to fetch formatted resume", err);
        setFormattedResume("Error loading formatted resume.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormattedResume();
  }, [resumeText]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur">
      <div className="bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-xl shadow-lg p-6 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          📄 Formatted Resume
        </h2>

        {loading ? (
          <p className="text-blue-500">Formatting resume...</p>
        ) : (
          <MarkdownText content={formattedResume} />
        )}
      </div>
    </div>
  );
};

export default FormattedResumeModal;
