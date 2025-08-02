# 🎙️ VocalPath – AI-Powered Interview Simulator

[VocalPath Live Demo](https://vocalpath-frontend.onrender.com)

VocalPath is an AI-driven, voice-powered interview platform that helps users simulate realistic interview experiences using speech recognition and large language models.

---

## 🔑 Features

- 🎤 **Voice-based Interaction**: Speak your answers in real-time, just like a real interview.
- 🤖 **AI Interviewer (Ashta)**: Human-like interviewer powered by Gemini AI.
- 📄 **Resume Parsing**: Upload your resume in PDF format and extract the contents automatically.
- 💼 **Role Summarization**: Paste job descriptions and get a concise summary used for contextual questioning.
- 🧠 **Customizable Rounds**:
  - Choose from: Technical, HR, Managerial, Behavioral
  - Optional: Personalized topic (e.g., React.js, Data Structures)
  - Difficulty selection (Beginner / Intermediate / Advanced)
- 🧑‍💻 **Typing Mode**: Write your answer manually for code questions or silent environments.
- 📹 **Visual Panel**:
  - AI and User profiles with mic/camera interaction status
  - Fallback image and retry camera if blocked
- 📊 **Final Feedback**:
  - Automatic feedback after 15 questions
  - AI evaluates in three blocks and provides a final result
  - Shows if selected for the next round
- 🌗 **Dark Mode Support**
- 🔁 **Request Another Round** in one click

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Speech**: Web Speech API (SpeechRecognition + SpeechSynthesis)
- **Backend**: Node.js, Express.js
- **AI Integration**: Gemini API (Google AI), PDF.js
- **Deployment**: Render (Frontend & Backend)

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vocalpath.git
cd vocalpath
