import express from "express";
import {
  startInterview,
  respondToInterview,
  formatResume,
  concludeInterview,
} from "../controllers/interviewController.js";
import { generateGeminiResponse } from "../utils/gemini.js";

const router = express.Router();

router.post("/start", startInterview);
router.post("/respond", respondToInterview);
router.post("/summarize-role", async (req, res) => {
  const { prompt } = req.body;

  try {
    const summary = await generateGeminiResponse(prompt);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: "Failed to summarize role" });
  }
});
router.post("/format-resume", formatResume);
router.post("/conclude", concludeInterview);

export default router;
