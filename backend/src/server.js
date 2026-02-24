import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import transactions from "./routes/transactions.js";
import products from "./routes/products.js";
import path from "path";

// ✅ Load correct env file based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`Req method: ${req.method}, Req URL: ${req.url}`);
  next();
});

// Routes
app.use("/api/transactions", transactions);
app.use("/api/products", products);

// ✅ Serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Root route
app.get("/", (req, res) => res.send("GoldenBear backend running"));

// ✅ Connect DB using env
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
