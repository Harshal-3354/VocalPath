import React, { useState } from "react";

const roles = ["Software Engineer", "Product Manager", "UX Designer"];

const RoleSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-800">
          🧑‍💼 Choose Your Role
        </h2>
        <p className="text-base text-gray-500">
          Select the position you'd like to be interviewed for.
        </p>
      </div>

      <div className="max-w-sm mx-auto w-full space-y-4">
        <div className="relative">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="" disabled>
              -- Select a role --
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <button
          onClick={() => onSelect(selected)}
          disabled={!selected}
          className={`w-full px-6 py-3 rounded-lg font-semibold text-white text-base transition-all duration-300 ${
            selected
              ? "bg-blue-600 hover:bg-blue-700 shadow-md"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          🚀 Start Interview
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
