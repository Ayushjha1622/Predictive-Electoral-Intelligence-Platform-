import Candidate from "../models/Candidate.js";
import { calculateScore } from "../utils/scoring.js";
import { calculatePoW } from "../utils/prediction.js";
import { analyzeGaps } from "../utils/gapAnalysis.js";

export const addCandidate = async (req, res) => {
  try {
    const candidateData = req.body;
    
    // Calculate initial score
    candidateData.score = calculateScore(candidateData);
    
    const candidate = new Candidate(candidateData);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const compareCandidates = async (req, res) => {
  try {
    let { candidates } = req.body;

    if (!candidates || candidates.length === 0) {
      return res.status(400).json({ error: "No candidates provided for comparison" });
    }

    // STEP 1: Re-calculate scores for current matrix state
    let processed = candidates.map(c => ({
      ...c,
      score: calculateScore(c)
    }));

    // STEP 2: Probability of Win (PoW)
    processed = calculatePoW(processed);

    // STEP 3: Sort by power index
    processed.sort((a, b) => b.score - a.score);

    // STEP 4: Strategic Gap Analysis
    const gaps = analyzeGaps(processed);

    res.json({
      winner: processed[0],
      matrix: processed,
      gaps
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
