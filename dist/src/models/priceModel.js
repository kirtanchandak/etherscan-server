"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceModel = void 0;
var mongoose_1 = require("mongoose");
var priceSchema = new mongoose_1.Schema({
    price_inr: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});
var PriceModel = (0, mongoose_1.model)('Price', priceSchema);
exports.PriceModel = PriceModel;
