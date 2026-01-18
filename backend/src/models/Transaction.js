import mongoose from "mongoose";

// 1 - create schema

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
