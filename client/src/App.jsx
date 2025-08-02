import React, { useState } from "react";
import MicInput from "./components/MicInput";
import ChatWindow from "./components/ChatWindow";
import TTSPlayer from "./components/TTSPlayer";
import FormattedResumeModal from "./components/FormattedResumeModal";
import InterviewVisualPanel from "./components/InterviewVisualPanel";
import OnboardingPanel from "./components/OnboardingPanel";
import RoleResumePanel from "./components/RoleResumePanel";
import { ToastContainer, toast } from "react-toastify";
import TypedAnswerInput from "./components/TypedAnswerInput";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [role, setRole] = useState("");
  const [history, setHistory] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [roleSummary, setRoleSummary] = useState("");
  const [showFormattedResume, setShowFormattedResume] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [roundType, setRoundType] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");

  const startInterview = async (selectedRole) => {
    setRole(selectedRole);

    const res = await fetch("http://localhost:5000/api/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: selectedRole,
        resumeText,
        roleSummary,
        roundType,
        customTopic,
        difficulty,
      }),
    });

    const data = await res.json();
    setAiResponse(data.message);
    setHistory([{ question: data.message, answer: "" }]);
  };

  const sendResponse = async (userAnswer) => {
    const finalAnswer = userAnswer || typedAnswer.trim();
    if (!finalAnswer) return;
    const updatedHistory = [...history];
    updatedHistory[updatedHistory.length - 1].answer = finalAnswer;

    const res = await fetch("http://localhost:5000/api/interview/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: updatedHistory,
        userAnswer,
        resumeText,
        roleSummary,
        roundType,
        customTopic,
        difficulty,
      }),
    });

    const data = await res.json();

    updatedHistory.push({ question: data.message, answer: "" });
    setHistory(updatedHistory);
    setAiResponse(data.message);

    // ✅ Now check after response is added
    if (updatedHistory.length === 15) {
      await concludeInterview(updatedHistory);
    }
  };

  const concludeInterview = async (finalHistory) => {
    try {
      const res = await fetch("http://localhost:5000/api/interview/conclude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: finalHistory,
          resumeText,
          roleSummary,
          roundType,
          customTopic,
          difficulty,
        }),
      });

      const data = await res.json();

      const fullFeedback = data.finalFeedback;
      const result = data.result?.toLowerCase(); // "success" or "failure"
      const chunkFeedbacks = data.feedbacks; // Optional: store or display separately
      setHistory((prev) => [
        ...prev,
        { question: data.finalFeedback, answer: "" },
      ]);
      setAiResponse(data.finalFeedback);
      setInterviewEnded(true);
      // 🎉 Display toast based on result
      if (result === "success") {
        toast.success(
          "🎉 Interview Concluded! You’re selected for the next round."
        );
      } else if (result === "failure") {
        toast.error("❌ Interview Concluded. Better luck next time.");
      } else {
        toast("✅ Interview concluded!");
      }
      // 🧾 Store or display feedback
      // setFinalFeedback(fullFeedback); // ⬅️ Full summary
      // setChunkFeedbacks(chunkFeedbacks); // ⬅️ Optional: Display per section (if you want)
    } catch (error) {
      toast.error("❌ Failed to conclude the interview.");
      console.error("Conclude Interview Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 py-10 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border border-gray-200 transition-all p-6 sm:p-10 space-y-12">
        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            🎙️ VocalPath
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Personalized, voice-powered AI interview experience.
          </p>
        </header>

        {!role ? (
          <OnboardingPanel
            resumeText={resumeText}
            setResumeText={setResumeText}
            roleSummary={roleSummary}
            setRoleSummary={setRoleSummary}
            roundType={roundType}
            setRoundType={setRoundType}
            customTopic={customTopic}
            setCustomTopic={setCustomTopic}
            difficulty={difficulty} // ⬅️ Add this
            setDifficulty={setDifficulty} // ⬅️ Add this
            startInterview={startInterview}
          />
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
            {/* Left Panel */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <RoleResumePanel
                roleSummary={roleSummary}
                setShowFormattedResume={setShowFormattedResume}
                roundType={roundType}
                customTopic={customTopic}
                difficulty={difficulty}
              />
            </div>

            {/* Center Panel */}
            <div className="lg:col-span-4 flex flex-col items-center justify-start space-y-6">
              <InterviewVisualPanel
                isSpeaking={isSpeaking}
                isUserSpeaking={isUserSpeaking}
                userIconStyle="rounded-full border shadow-lg"
              />
              <MicInput
                onSend={sendResponse}
                onUserSpeakStart={() => setIsUserSpeaking(true)}
                onUserSpeakEnd={() => setIsUserSpeaking(false)}
              />
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {/* Chat window with scroll */}
              {/* <div className="flex-1 max-h-[400px] overflow-y-auto rounded-xl border border-gray-200 shadow-inner p-4"> */}
              <ChatWindow history={history} />
              {/* </div> */}

              {/* Typed input */}
              <TypedAnswerInput
                typedAnswer={typedAnswer}
                setTypedAnswer={setTypedAnswer}
                onSubmit={sendResponse}
              />

              {/* TTS player hidden (but rendered) */}
              <TTSPlayer
                text={aiResponse}
                onSpeakStart={() => setIsSpeaking(true)}
                onSpeakEnd={() => setIsSpeaking(false)}
              />
            </div>
          </section>
        )}
      </div>

      {showFormattedResume && (
        <FormattedResumeModal
          resumeText={resumeText}
          onClose={() => setShowFormattedResume(false)}
        />
      )}
      {interviewEnded && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setRole("");
              setHistory([]);
              setAiResponse("");
              setInterviewEnded(false);
              toast.info("🔄 Ready for a new round!");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            🔁 Request Another Round
          </button>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
