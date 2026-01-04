import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const apiResponse = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `mongodb connected successfully ${apiResponse.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};
