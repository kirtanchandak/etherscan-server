"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.UserModel = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var TransactionSchema = new mongoose_1.Schema({
    blockNumber: { type: String, required: true },
    timeStamp: { type: String, required: true },
    hash: { type: String, required: true },
    nonce: { type: String, required: true },
    blockHash: { type: String, required: true },
    transactionIndex: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    value: { type: String, required: true },
    gas: { type: String, required: true },
    gasPrice: { type: String, required: true },
    isError: { type: String, required: true },
    txreceipt_status: { type: String, required: true },
    input: { type: String, required: true },
    contractAddress: { type: String, required: true },
    cumulativeGasUsed: { type: String, required: true },
    gasUsed: { type: String, required: true },
    confirmations: { type: String, required: true },
});
var UserSchema = new mongoose_1.Schema({
    address: { type: String, required: true, unique: true },
    transactions: { type: [TransactionSchema], default: [] }
});
var UserModel = mongoose_1.default.model("User", UserSchema);
exports.UserModel = UserModel;
