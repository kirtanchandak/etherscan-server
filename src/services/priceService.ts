import axios from "axios";
import { CryptoModel } from "../models/cryptoModel";
import mongoose from "mongoose";

export const fetchAndStoreCryptoPrices = async () => {
  console.log("Starting fetchAndStoreCryptoPrices function...");
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum,matic-network",
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
      }
    );

    const { bitcoin, ethereum, "matic-network": polygon } = response.data;

    if (!bitcoin || !ethereum || !polygon) {
      throw new Error("Data for one or more cryptocurrencies is undefined");
    }

    const cryptos = [
      {
        name: "Bitcoin",
        symbol: "BTC",
        price_usd: bitcoin.usd,
        market_cap_usd: bitcoin.usd_market_cap,
        change_24h: bitcoin.usd_24h_change,
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        price_usd: ethereum.usd,
        market_cap_usd: ethereum.usd_market_cap,
        change_24h: ethereum.usd_24h_change,
      },
      {
        name: "Polygon",
        symbol: "MATIC",
        price_usd: polygon.usd,
        market_cap_usd: polygon.usd_market_cap,
        change_24h: polygon.usd_24h_change,
      },
    ];

    console.log("Prepared crypto data:", JSON.stringify(cryptos, null, 2));

    for (const crypto of cryptos) {
      console.log(`Attempting to save ${crypto.name} data...`);
      const newCrypto = new CryptoModel(crypto);
      try {
        const savedCrypto = await newCrypto.save();
        console.log(
          `${crypto.name} data saved successfully:`,
          JSON.stringify(savedCrypto, null, 2)
        );
      } catch (saveError) {
        console.error(`Error saving ${crypto.name} data:`, saveError);
      }
    }

    console.log("fetchAndStoreCryptoPrices completed successfully.");
  } catch (error) {
    console.error("Error in fetchAndStoreCryptoPrices:");
  } finally {
    console.log("Fetching current document count...");
    const count = await CryptoModel.countDocuments();
    console.log(
      `Current number of documents in the Crypto collection: ${count}`
    );
  }
};

// Helper function to check database status
export const checkDatabaseStatus = async () => {
  try {
    const state = mongoose.connection.readyState;
    console.log("MongoDB connection state:", state);

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
