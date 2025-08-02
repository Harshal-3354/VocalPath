import React from "react";
import ResumeUploader from "./ResumeUploader";
import RoleSummarizer from "./RoleSummarizer";
import RoleSelector from "./RoleSelector";

const OnboardingPanel = ({
  resumeText,
  setResumeText,
  roleSummary,
  setRoleSummary,
  roundType,
  setRoundType,
  customTopic,
  setCustomTopic,
  startInterview,
  difficulty,
  setDifficulty,
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Panel */}
      <div className="space-y-6">
        {/* Resume Uploader */}
        <div className="bg-white border border-indigo-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-indigo-800 mb-3">
            📄 Upload Resume (Required)
          </h2>
          <ResumeUploader onExtract={setResumeText} />
        </div>
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 space-y-3">
          <label
            htmlFor="difficulty"
            className="block font-semibold text-gray-700"
          >
            ⚙️ Select Difficulty
          </label>
          <select
            id="difficulty"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">-- Choose --</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Round Type Selection */}
        <div className="bg-white border border-blue-200 rounded-xl shadow-sm p-6 space-y-3">
          <label
            htmlFor="round-type"
            className="block font-semibold text-blue-700"
          >
            🎯 Select Interview Round
          </label>
          <select
            id="round-type"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={roundType}
            onChange={(e) => setRoundType(e.target.value)}
          >
            <option value="">-- Choose --</option>
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Managerial">Managerial</option>
            <option value="Behavioral">Behavioral</option>
          </select>
        </div>

        {/* Personalized Topic */}
        <div className="bg-white border border-purple-200 rounded-xl shadow-sm p-6 space-y-3">
          <label
            htmlFor="custom-topic"
            className="block font-semibold text-purple-700"
          >
            🧠 Personalized Topic (Optional)
          </label>
          <input
            type="text"
            id="custom-topic"
            placeholder="e.g. React.js, Time Management..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
          />
        </div>
      </div>

      {/* Right Panel - Role Description */}
      <div className="bg-white border border-emerald-200 rounded-xl shadow-sm p-6 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-emerald-800 mb-3">
            💼 Role Description
          </h2>
          <RoleSummarizer onSummarize={setRoleSummary} />
        </div>

        <div className="mt-6 border-t pt-6 border-emerald-100">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 shadow-sm">
            <RoleSelector onSelect={startInterview} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingPanel;
