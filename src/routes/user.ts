import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import { UserModel } from "../models/userModel";

const router = Router();

router.get("/getTransactions", async (req: Request, res: Response) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: "Address query parameter is required" });
    }

    try {
        const response = await axios.get(
            `https://api.etherscan.io/api`, {
                params: {
                    module: "account",
                    action: "txlist",
                    address,
                    startblock: 0,
                    endblock: 99999999,
                    sort: "asc",
                    apikey: process.env.ETHERSCAN_API_KEY
                }
            }
        );

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
        return res.status(500).json({ error: "An error occurred while fetching transactions" });
    }
});

export { router as userRouter };
