import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: String,
  party: String,

  // CORE FACTORS
  incumbency: { type: String, enum: ["high", "medium", "low"], default: "low" },
  partyStrength: { type: Number, default: 5 },
  pastWork: { type: Number, default: 5 },
  personalBase: { type: Number, default: 5 },

  // DEMOGRAPHICS
  casteBase: { type: Number, default: 5 },
  religiousBase: { type: Number, default: 5 },

  // OSINT
  sentiment: { type: Number, default: 5 },

  // FINAL
  score: Number,
  pow: Number // Probability of Win
});

export default mongoose.model("Candidate", candidateSchema);
