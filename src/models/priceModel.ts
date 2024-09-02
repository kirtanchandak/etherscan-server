import { Schema, model } from "mongoose";

const priceSchema = new Schema({
    price_inr: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const PriceModel = model('Price', priceSchema);

export { PriceModel };
