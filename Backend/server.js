import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ IMPORTANT: your frontend URL
const FRONTEND_URL = "https://predictive-electoral-intelligence-platform-eki73s6mw.vercel.app";
// ✅ SIMPLE + SAFE CORS
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", authRoutes);
app.use("/api", candidateRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API working 🚀");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));