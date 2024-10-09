// This the task I compelted  on 3rd septeber for Bakckend Intern.

import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import { UserModel } from "../models/userModel";

const router = Router();

router.get("/getTransactions", async (req: Request, res: Response) => {
  const { address } = req.query;

  if (!address) {
    return res
      .status(400)
      .json({ error: "Address query parameter is required" });
  }

  try {
    const response = await axios.get(`https://api.etherscan.io/api`, {
      params: {
        module: "account",
        action: "txlist",
        address,
        startblock: 0,
        endblock: 99999999,
        sort: "asc",
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });

    if (response.data.status === "1") {
      const transactions = response.data.result;
      const user = await UserModel.findOneAndUpdate(
        { address },
        { $set: { address }, $push: { transactions } },
        { upsert: true, new: true }
      );

      return res.json({ user, transactions });
    } else {
      return res.status(400).json({ error: response.data.message });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error.message || error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching transactions" });
  }
});

router.get("/getUserExpenses", async (req: Request, res: Response) => {
  const { address } = req.query;

  if (!address) {
    return res
      .status(400)
      .json({ error: "Address query parameter is required" });
  }

  try {
    const user = await UserModel.findOne({ address });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const totalExpenses = user.transactions.reduce((acc, tx) => {
      const gasUsed = parseFloat(tx.gasUsed);
      const gasPrice = parseFloat(tx.gasPrice);
      return acc + (gasUsed * gasPrice) / 1e18;
    }, 0);

    const etherPriceResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "ethereum",
          vs_currencies: "usd",
        },
      }
    );
    const etherPrice = etherPriceResponse.data.ethereum.usd;
    return res.json({
      address,
      totalExpenses,
      etherPrice,
    });
  } catch (error) {
    console.error(
      "Error fetching user expenses or Ether price:",
      error.message || error
    );
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

export { router as userRouter };
