import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';
import { userRouter } from './routes/user';
import { fetchAndStoreEthereumPrice } from './services/priceService';

dotenv.config();

const app: Application = express();

app.use("/user", userRouter);

cron.schedule('*/10 * * * *', async () => {
    console.log('Fetching Ethereum price...');
    await fetchAndStoreEthereumPrice();
});

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
