import React from "react";

const ChatWindow = ({ history }) => (
  <div className="space-y-4">
    {history.map((entry, i) => (
      <div key={i} className="bg-gray-50 p-3 rounded border">
        <p>
          <strong>AI:</strong> {entry.question}
        </p>
        {entry.answer && (
          <p>
            <strong>You:</strong> {entry.answer}
          </p>
        )}
      </div>
    ))}
  </div>
);

export default ChatWindow;
