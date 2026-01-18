import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import transactionRoutes from "./routes/transactions.js";

import catalogRoutes from "./routes/catalog.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/catalog", catalogRoutes);

app.get("/", (req, res) => res.send("GoldenBear backend running"));

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
