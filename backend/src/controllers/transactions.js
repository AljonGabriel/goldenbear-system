import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const { name, date, price } = req.body;
    const newTransaction = new Transaction({ name, date, price });

    await newTransaction.save();
    res.status(201).send("Add Transactions Success", newTransaction);
  } catch (error) {}
};

export const getTransactions = async (req, res) => {
  try {
    // -1 It will show the new entry first
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error in getTransactions", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const deleteTransaction = (req, res) => {
  res.status(200).send("deleteTransaction Success");
};

// 200 Sucess - 300 redirect - 400 Client Errors - 500 Server Errors
