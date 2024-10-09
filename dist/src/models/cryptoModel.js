"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoModel = void 0;
var mongoose_1 = __importStar(require("mongoose"));
// Create a Mongoose schema for storing cryptocurrency data
var cryptoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    price_usd: { type: Number, required: true },
    market_cap_usd: { type: Number, required: true },
    change_24h: { type: Number, required: true },
    updated_at: { type: Date, default: Date.now },
});
var CryptoModel = mongoose_1.default.model("Crypto", cryptoSchema);
exports.CryptoModel = CryptoModel;
