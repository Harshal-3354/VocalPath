import React, { useEffect, useRef } from "react";
import MarkdownText from "./MarkdownText";

const ChatWindow = ({ history }) => {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <div className="max-h-[400px] overflow-y-auto px-3 py-2 space-y-5 rounded-xl bg-gray-50 border border-gray-200 shadow-inner scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
      {history.map((entry, index) => (
        <div key={index} className="space-y-3">
          {/* AI Message */}
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-900 rounded-2xl px-5 py-3 shadow max-w-[80%]">
              <p className="text-xs font-semibold text-blue-600 mb-1">AI</p>
              <MarkdownText content={entry.question} />
            </div>
          </div>

          {/* User Message */}
          {entry.answer && (
            <div className="flex justify-end">
              <div className="bg-emerald-500 text-white rounded-2xl px-5 py-3 shadow-md max-w-[80%]">
                <p className="text-xs font-semibold text-white/80 mb-1 text-right">
                  You
                </p>
                <MarkdownText content={entry.answer} />
              </div>
            </div>
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
