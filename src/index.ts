import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import { userRouter } from "./routes/user";
import { CryptoModel } from "./models/cryptoModel";
import { fetchAndStoreCryptoPrices } from "./services/priceService";
import { checkDatabaseStatus } from "./services/priceService";
import axios from "axios";

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
    cron.schedule("0 */2 * * *", async () => {
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

app.get("/stats", async (req, res) => {
  const { coin } = req.query;

  if (!coin || typeof coin !== "string") {
    return res.status(400).json({ error: "Invalid coin parameter" });
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: coin,
          vs_currencies: "usd",
          include_market_cap: "true",
          include_24hr_change: "true",
        },
      }
    );

    const coinData = response.data[coin];

    if (!coinData) {
      return res.status(404).json({ error: "Cryptocurrency not found" });
    }

    const result = {
      price: coinData.usd,
      marketCap: coinData.usd_market_cap,
      "24hChange": coinData.usd_24h_change,
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const calculateStandardDeviation = (values: number[]) => {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map((value) => (value - mean) ** 2);
  const variance =
    squaredDiffs.reduce((a, b) => a + b, 0) / squaredDiffs.length;
  return Math.sqrt(variance);
};

app.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  if (!coin || typeof coin !== "string") {
    return res.status(400).json({ error: "Invalid coin parameter" });
  }

  try {
    const records = await CryptoModel.find({ symbol: coin.toUpperCase() })
      .sort({ updated_at: -1 })
      .limit(100);

    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: "No records found for the specified cryptocurrency" });
    }

    const prices = records.map((record) => record.price_usd);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
