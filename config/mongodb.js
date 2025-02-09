import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    process.exit(1); // Stop server if DB connection fails
  }
};

export default connectDB;
