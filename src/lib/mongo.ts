import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export async function connectToDatabase() {
  console.log("CLIENT URI: ", process.env.MONGODB_URI);
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}
