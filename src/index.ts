import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import { userRouter } from "./routes/user";
import { fetchAndStoreCryptoPrices } from "./services/priceService";
import { checkDatabaseStatus } from "./services/priceService";

dotenv.config();

const app: Application = express();

app.use("/user", userRouter);

const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
    await checkDatabaseStatus();
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

initializeDatabase().then(() => {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
    cron.schedule("*0 */2 * * *", async () => {
      console.log("Cron job started: Fetching cryptocurrency data...");
      try {
        await checkDatabaseStatus();
        await fetchAndStoreCryptoPrices();
        console.log("Cron job completed successfully.");
      } catch (error) {
        console.error("Error in cron job:", error);
      }
    });
  });
});

// test-route
app.get("/test-fetch", async (req, res) => {
  try {
    await checkDatabaseStatus();
    await fetchAndStoreCryptoPrices();
    res.send("Fetch and store completed. Check logs for details.");
  } catch (error) {
    res.status(500).send("Error: " + (error as Error).message);
  }
});
