// MarkdownText.jsx
import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownText = ({ content }) => (
  <ReactMarkdown
    components={{
      p: ({ children }) => (
        <p className="text-gray-800 text-base leading-relaxed mb-2">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-inside text-gray-800 mb-2">{children}</ul>
      ),
      li: ({ children }) => <li className="ml-4 mb-1">{children}</li>,
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-700">{children}</em>
      ),
      code: ({ children }) => (
        <code className="bg-gray-100 text-purple-600 px-1 py-0.5 rounded">
          {children}
        </code>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownText;
