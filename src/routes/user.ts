import { Router } from "express"
import { Request, Response } from "express";
import axios from "axios";

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
            res.json(response.data.result);
        } else {
            res.status(400).json({ error: response.data.message });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching transactions" });
    }
});

export { router as userRouter };