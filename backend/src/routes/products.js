import { Router } from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/products.js";
import upload from "../middleware/upload.js"; // Multer setup

const router = Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);
router.put("/:id", upload.single("image"), updateProduct); // ✅ update with optional image
router.delete("/:id", deleteProduct);

export default router;
