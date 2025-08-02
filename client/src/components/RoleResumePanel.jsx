import React from "react";

const RoleResumePanel = ({
  roleSummary,
  setShowFormattedResume,
  roundType,
  customTopic,
  difficulty,
}) => {
  return (
    <aside className="lg:col-span-3 space-y-6 text-sm">
      {/* Role Summary */}
      {/* Role Summary (conditionally shown) */}
      {roleSummary && (
        <div className="bg-gray-50 border border-blue-100 rounded-xl p-4 shadow-sm space-y-2">
          <h3 className="text-blue-700 font-semibold text-base mb-1 flex items-center gap-2">
            🎯 Role Summary
          </h3>
          <div className="max-h-48 overflow-y-auto text-gray-800 whitespace-pre-wrap leading-relaxed text-sm scrollbar-thin scrollbar-thumb-gray-300">
            {roleSummary}
          </div>
        </div>
      )}

      {/* Round Type */}
      {roundType && (
        <div className="bg-gray-50 border border-indigo-100 rounded-xl p-4 shadow-sm space-y-1">
          <h4 className="text-indigo-600 font-medium text-sm">
            🌀 Interview Round
          </h4>
          <p className="text-gray-700 font-semibold capitalize">{roundType}</p>
        </div>
      )}

      {/* Custom Topic */}
      {customTopic && (
        <div className="bg-gray-50 border border-purple-100 rounded-xl p-4 shadow-sm space-y-1">
          <h4 className="text-purple-600 font-medium text-sm">
            🎓 Custom Topic
          </h4>
          <p className="text-gray-700">{customTopic}</p>
        </div>
      )}
      {/* Difficulty (conditionally shown) */}
      {difficulty && (
        <div className="bg-gray-50 border border-purple-100 rounded-xl p-4 shadow-sm space-y-1">
          <h3 className="text-purple-700 font-semibold text-base mb-1 flex items-center gap-2">
            🧩 Difficulty Level
          </h3>
          <p className="text-sm text-gray-700">{difficulty}</p>
        </div>
      )}

      {/* Resume Button */}
      <button
        onClick={() => setShowFormattedResume(true)}
        className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition"
      >
        📄 See Your Resume
      </button>
    </aside>
  );
};

export default RoleResumePanel;
