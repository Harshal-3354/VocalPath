import React, { useEffect } from "react";

const TTSPlayer = ({ text }) => {
  useEffect(() => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  }, [text]);

  return null;
};

export default TTSPlayer;
