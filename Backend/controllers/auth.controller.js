import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json({ message: "User created" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    if (!req.body) {
      console.error("CRITICAL: req.body is undefined!");
      return res.status(400).json({ error: "No request body received. Check Content-Type header." });
    }
    const { email, password } = req.body;
    console.log("DEBUG: Login request body:", { email, hasPassword: !!password });

    if (mongoose.connection.readyState !== 1) {
      console.error("DEBUG: Database not connected. State:", mongoose.connection.readyState);
      return res.status(500).json({ error: "Database connection in progress." });
    }

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findOne({ email });
    console.log("DEBUG: User query result:", user ? "Found" : "Not Found");
    
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    console.log("DEBUG: Comparing passwords...");
    const match = await bcrypt.compare(password, user.password);
    console.log("DEBUG: Password match result:", match);
    
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const secret = process.env.JWT_SECRET || "fallback_secret";
    console.log("DEBUG: Generating token with secret length:", secret.length);
    
    const token = jwt.sign({ id: user._id.toString() }, secret);
    console.log("DEBUG: Token generated length:", token.length);

    console.log("DEBUG: Setting cookie...");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    console.log("DEBUG: Sending success response");
    return res.json({ message: "Login success" });
  } catch (err) {
    console.error("CRITICAL: Login error", err);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      details: err.message,
      stack: err.stack
    });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  res.json({ message: "Logged out" });
};
