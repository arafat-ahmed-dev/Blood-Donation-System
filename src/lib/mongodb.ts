import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("Missing MongoDB URL");

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
    return connection; // Return the connection instance
  } catch (error) {
    console.log(error);
  }
};