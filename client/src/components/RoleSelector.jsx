import React, { useState } from "react";

const roles = ["Software Engineer", "Product Manager", "UX Designer"];

const RoleSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Choose a role:</h2>
      <select
        className="w-full p-2 border rounded"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Select role...</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <button
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        onClick={() => onSelect(selected)}
        disabled={!selected}
      >
        Start Interview
      </button>
    </div>
  );
};

export default RoleSelector;
