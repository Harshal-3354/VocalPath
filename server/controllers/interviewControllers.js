import { generateGeminiResponse } from "../utils/gemini.js";

export const startInterview = async (req, res) => {
  const { role } = req.body;

  const prompt = `You're an AI interviewer for the ${role} role. Ask your first question.`;
  try {
    const response = await generateGeminiResponse(prompt);
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: "Gemini failed to respond" });
  }
};

export const respondToInterview = async (req, res) => {
  const { history, userAnswer } = req.body;

  const prompt = `
    You're an AI interviewer. Here is the conversation history:
    ${history
      .map(
        (entry, i) => `Q${i + 1}: ${entry.question}\nA${i + 1}: ${entry.answer}`
      )
      .join("\n")}
    Now, the user answered: "${userAnswer}". Provide feedback and ask the next question.
  `;

  try {
    const response = await generateGeminiResponse(prompt);
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: "Gemini failed to respond" });
  }
};
