  import express from "express";
import {
  addCandidate,
  getCandidates,
  compareCandidates
} from "../controllers/candidate.controller.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/candidate", protect, addCandidate);
router.get("/candidates", protect, getCandidates);
router.post("/compare", protect, compareCandidates);

export default router;
