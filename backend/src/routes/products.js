// routes/products.js
import { Router } from "express";
import { addProduct, getProducts } from "../controllers/products.js";
import upload from "../utils/upload.js";

const router = Router();

// Add product with image upload
router.post("/", upload.single("image"), addProduct);

// Get all products
router.get("/", getProducts);

export default router;
