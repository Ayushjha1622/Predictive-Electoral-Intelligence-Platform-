import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function testLogin() {
  await connectDB();
  const email = "test@example.com"; // Change to a real email if known
  const password = "password123";

  try {
    const user = await User.findOne({ email: { $exists: true } }); // Just get any user
    if (!user) {
      console.log("No users found");
      process.exit(0);
    }
    console.log("Found user:", user.email);
    
    // Test bcrypt
    const match = await bcrypt.compare(password, user.password);
    console.log("Bcrypt match:", match);

    // Test JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("JWT Token generated");

    process.exit(0);
  } catch (err) {
    console.error("ERROR IN TEST:", err);
    process.exit(1);
  }
}
testLogin();
