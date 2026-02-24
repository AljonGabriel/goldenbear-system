// controllers/products.js
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    // multer puts the uploaded file info in req.file
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.imageUrl) {
      // If imageUrl is a full URL or contains /uploads/, extract just the filename
      const filename = product.imageUrl.split("/").pop();
      const filePath = path.join(process.cwd(), "uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });
      } else {
        console.warn("Image file not found:", filePath);
      }
    }

    res.json({ message: "Product and image deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
