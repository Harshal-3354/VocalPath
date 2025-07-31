import express from "express";
import {
  startInterview,
  respondToInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/start", startInterview);
router.post("/respond", respondToInterview);

export default router;
