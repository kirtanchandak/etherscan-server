import mongoose, { Schema } from "mongoose";

interface ICrypto extends Document {
  name: string;
  symbol: string;
  price_usd: number;
  market_cap_usd: number;
  change_24h: number;
  updated_at: Date;
}

// Create a Mongoose schema for storing cryptocurrency data
const cryptoSchema: Schema = new Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price_usd: { type: Number, required: true },
  market_cap_usd: { type: Number, required: true },
  change_24h: { type: Number, required: true },
  updated_at: { type: Date, default: Date.now },
});

const CryptoModel = mongoose.model<ICrypto>("Crypto", cryptoSchema);

export { CryptoModel };
