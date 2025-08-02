import React, { useEffect, useRef } from "react";

const TTSPlayer = ({ text, onSpeakStart, onSpeakEnd }) => {
  const lastSpokenRef = useRef("");

  useEffect(() => {
    if (!text) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Only speak if text has changed
    if (text === lastSpokenRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      console.log("🔊 Speaking...");
      if (onSpeakStart) onSpeakStart();
    };

    utterance.onend = () => {
      console.log("✅ Done speaking.");
      if (onSpeakEnd) onSpeakEnd();

      // ✅ Mark it spoken only after it's done
      lastSpokenRef.current = text;
    };

    const assignVoiceAndSpeak = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice =
          voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
          voices.find((v) => v.lang === "en-US") ||
          voices[0];
      }
      speechSynthesis.speak(utterance);
    };

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = assignVoiceAndSpeak;
    } else {
      assignVoiceAndSpeak();
    }

    return () => {
      speechSynthesis.cancel();
    };
  }, [text, onSpeakStart, onSpeakEnd]);

  return null;
};

export default TTSPlayer;
