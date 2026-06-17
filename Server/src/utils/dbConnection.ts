import mongoose from "mongoose";

export const dbConn = async (): Promise<void> => {
  try {
    const MONGO_DB_URI = process.env.MONGO_DB_URI;

    if (!MONGO_DB_URI) {
      console.error("MongoDB URI missing in environment variables.");
      process.exit(1); // Exit process if critical env missing
    }

    // Connect using async/await
    await mongoose.connect(MONGO_DB_URI as string, {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully.");

    // Handle disconnections or issues dynamically
    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting reconnection...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });

    // Handle app termination (graceful shutdown)
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination.");
      process.exit(0);
    });

  } catch (error: any) {
    console.error("Error while connecting to MongoDB:", error.message);
    process.exit(1);
  }
};