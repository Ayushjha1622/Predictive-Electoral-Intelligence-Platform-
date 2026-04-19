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

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", candidateRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
