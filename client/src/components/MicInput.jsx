import React, { useState, useRef } from "react";

const MicInput = ({ onSend, onUserSpeakStart, onUserSpeakEnd }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  const initRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("🎙️ Listening...");
      setListening(true);
      transcriptRef.current = "";
      if (onUserSpeakStart) onUserSpeakStart();
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          transcriptRef.current += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      console.log("📝 Partial:", interimTranscript);
    };

    recognition.onerror = (err) => {
      console.error("Mic error:", err);
      setListening(false);
      if (onUserSpeakEnd) onUserSpeakEnd();
    };

    recognition.onend = () => {
      console.log("🛑 Mic stopped.");
      setListening(false);
      if (onUserSpeakEnd) onUserSpeakEnd();

      const finalTranscript = transcriptRef.current.trim();
      if (finalTranscript) {
        onSend(finalTranscript);
        transcriptRef.current = "";
      }
    };

    return recognition;
  };

  const handleMicToggle = () => {
    if (!listening) {
      recognitionRef.current = initRecognition();
      recognitionRef.current.start();
    } else {
      recognitionRef.current?.stop();
    }
  };

  return (
    <div className="w-full flex justify-center mt-4">
      <button
        onClick={handleMicToggle}
        aria-label="Toggle mic"
        className={`flex items-center justify-center gap-3 px-8 py-4 text-white font-semibold text-lg rounded-full transition-all duration-300 focus:outline-none shadow-xl ${
          listening
            ? "bg-red-600 animate-pulse ring-2 ring-red-300"
            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        }`}
      >
        {listening ? "🛑 Stop Recording" : "🎤 Start Recording"}
      </button>
    </div>
  );
};

export default MicInput;
