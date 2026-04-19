import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("SUCCESS: DB Connected");
    const count = await mongoose.connection.db.collection('users').countDocuments();
    console.log("User count:", count);
    process.exit(0);
  } catch (err) {
    console.error("FAILURE:", err.message);
    process.exit(1);
  }
}
check();
