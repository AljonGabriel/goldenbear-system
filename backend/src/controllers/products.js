import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
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

// GET ALL PRODUCTS
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

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.imageUrl) {
      const filename = product.imageUrl.split("/").pop();
      const filePath = path.join(process.cwd(), "uploads", filename);

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting image file:", err);
        });
      }
    }

    res.json({ message: "Product and image deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
    };

    // If a new image is uploaded
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;

      // Delete old image if exists
      const oldProduct = await Product.findById(id);
      if (oldProduct?.imageUrl) {
        const oldFilename = oldProduct.imageUrl.split("/").pop();
        const oldFilePath = path.join(process.cwd(), "uploads", oldFilename);

        if (fs.existsSync(oldFilePath)) {
          fs.unlink(oldFilePath, (err) => {
            if (err) console.error("Error deleting old image:", err);
          });
        }
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
