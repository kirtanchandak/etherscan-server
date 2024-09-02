import mongoose, { Schema, Document, Model } from "mongoose";

interface ITransaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
}

interface IUser extends Document {
    address: string;
    transactions: ITransaction[];
}

const TransactionSchema: Schema = new Schema({
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

const UserSchema: Schema = new Schema({
    address: { type: String, required: true, unique: true },
    transactions: { type: [TransactionSchema], default: [] }
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export { UserModel, IUser, ITransaction };
