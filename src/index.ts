import express from 'express';
import dotenv from "dotenv";
import { userRouter } from './routes/user';

dotenv.config();

const app = express();

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});