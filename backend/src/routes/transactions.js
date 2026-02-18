import { Router } from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactions.js";

const router = Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
// Update transaction by ID
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
