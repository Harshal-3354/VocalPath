import React, { useEffect, useRef, useState } from "react";
import { FaMicrophoneSlash, FaMicrophone, FaVideoSlash } from "react-icons/fa";

const fallbackUserImage =
  "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=60";

const InterviewVisualPanel = ({ isSpeaking, isUserSpeaking }) => {
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraError(false);
        setCameraOn(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
        setCameraError(true);
        setCameraOn(false);
      });
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className="w-full mt-6 flex flex-col items-center gap-6 ">
      {/* AI Avatar Box */}
      <div
        className={`w-64 h-48 rounded-xl overflow-hidden shadow-xl border-4 ${
          isSpeaking ? "border-green-400" : "border-blue-200"
        } bg-gradient-to-br from-blue-400 to-purple-600 relative`}
      >
        <img
          src="https://images.unsplash.com/photo-1698047681452-08eba22d0c64?w=600&auto=format&fit=crop&q=60"
          alt="AI Interviewer"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-1 text-sm font-medium">
          AI Interviewer (Ashta)
        </div>
      </div>

      {/* User Box */}
      <div
        className={`relative w-64 h-48 rounded-xl overflow-hidden shadow-xl border-2 ${
          cameraError ? "border-red-200" : "border-gray-300"
        } bg-white`}
      >
        {cameraOn && !cameraError ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white rounded-full p-1">
              {isUserSpeaking ? (
                <FaMicrophone className="w-4 h-4 text-green-400" />
              ) : (
                <FaMicrophoneSlash className="w-4 h-4 text-red-400" />
              )}
            </div>
          </>
        ) : (
          <>
            <img
              src={fallbackUserImage}
              alt="User fallback"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-xs space-y-2">
              <FaVideoSlash className="text-lg opacity-80" />
              <p className="text-[11px] font-medium">Camera Off</p>
              <button
                onClick={startCamera}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition"
              >
                Turn On Camera
              </button>
            </div>
          </>
        )}

        <div className="absolute bottom-0 w-full bg-gray-800/70 text-white text-center py-1 text-sm font-medium">
          You (Live)
        </div>
      </div>
    </div>
  );
};

export default InterviewVisualPanel;
