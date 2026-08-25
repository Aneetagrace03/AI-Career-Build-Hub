const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("✅ MongoDB Connected:", mongoose.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;