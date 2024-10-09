import mongoose from "mongoose";
import { CryptoModel } from "src/models/cryptoModel";

export const checkDatabaseStatus = async () => {
  try {
    const state = mongoose.connection.readyState;

    if (state === 1) {
      const count = await CryptoModel.countDocuments();
      console.log(`Number of documents in the Crypto collection: ${count}`);
    } else {
      console.log("Database is not connected. Unable to count documents.");
    }
  } catch (error) {
    console.error("Error checking database status:", error);
  }
};
