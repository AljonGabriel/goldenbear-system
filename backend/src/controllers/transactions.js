import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const { barcode, name, price, date, reason, dueDate, status } = req.body;

    const newTransaction = new Transaction({
      barcode,
      name,
      price,
      date,
      reason,
      dueDate,
      status,
    });

    await newTransaction.save();

    // ✅ Send JSON response with both message and transaction
    res.status(201).json({
      message: "Add Transaction Success",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Failed to add transaction" });
  }
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

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        status: "Completed",
        comment,
        completedAt: new Date(),
      },
      { new: true },
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Failed to update transaction", error });
  }
};

export const deleteTransaction = (req, res) => {
  res.status(200).send("deleteTransaction Success");
};

// 200 Sucess - 300 redirect - 400 Client Errors - 500 Server Errors
