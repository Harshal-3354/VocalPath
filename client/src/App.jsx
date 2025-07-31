import React, { useState } from "react";
import RoleSelector from "./components/RoleSelector";
import MicInput from "./components/MicInput";
import ChatWindow from "./components/ChatWindow";
import TTSPlayer from "./components/TTSPlayer";

const App = () => {
  const [role, setRole] = useState("");
  const [history, setHistory] = useState([]);
  const [aiResponse, setAiResponse] = useState("");

  const startInterview = async (selectedRole) => {
    setRole(selectedRole);
    const res = await fetch("http://localhost:5000/api/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: selectedRole }),
    });
    const data = await res.json();
    setAiResponse(data.message);
    setHistory([{ question: data.message, answer: "" }]);
  };

  const sendResponse = async (userAnswer) => {
    const updatedHistory = [...history];
    updatedHistory[updatedHistory.length - 1].answer = userAnswer;

    const res = await fetch("http://localhost:5000/api/interview/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history: updatedHistory, userAnswer }),
    });

    const data = await res.json();
    updatedHistory.push({ question: data.message, answer: "" });
    setHistory(updatedHistory);
    setAiResponse(data.message);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">🎙️ VocalPath</h1>
        {!role ? (
          <RoleSelector onSelect={startInterview} />
        ) : (
          <>
            <ChatWindow history={history} />
            <MicInput onSend={sendResponse} />
            <TTSPlayer text={aiResponse} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
