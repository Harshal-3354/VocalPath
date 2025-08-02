import React from "react";

const TypedAnswerInput = ({ typedAnswer, setTypedAnswer, onSubmit }) => {
  return (
    <div className="space-y-2 mt-4">
      <label
        htmlFor="typed-answer"
        className="block text-sm font-medium text-gray-700"
      >
        ✍️ Type your answer (for code or long responses)
      </label>

      <textarea
        id="typed-answer"
        rows={4}
        placeholder="Type your answer here..."
        className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
        value={typedAnswer}
        onChange={(e) => setTypedAnswer(e.target.value)}
      />

      <button
        onClick={() => onSubmit(null)} // `null` tells parent to use typedAnswer
        disabled={!typedAnswer.trim()}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
      >
        Submit Typed Answer
      </button>
    </div>
  );
};

export default TypedAnswerInput;
