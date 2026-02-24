// controllers/products.js
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    // Use BASE_URL from env
    const BASE_URL =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const imageUrl = req.file
      ? `${BASE_URL}/uploads/${req.file.filename}`
      : null;

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
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
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
