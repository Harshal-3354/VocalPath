import React, { useState } from "react";

const MicInput = ({ onSend }) => {
  const [listening, setListening] = useState(false);

  const handleMicClick = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onSend(transcript);
    };

    recognition.start();
  };

  return (
    <button
      className={`w-full p-3 text-white rounded ${
        listening ? "bg-red-600" : "bg-green-600"
      }`}
      onClick={handleMicClick}
    >
      {listening ? "Listening..." : "🎤 Speak Answer"}
    </button>
  );
};

export default MicInput;
