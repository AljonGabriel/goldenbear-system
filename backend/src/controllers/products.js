// controllers/products.js
import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { name, price, description, category, stock } = req.body;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
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
    console.error("Error in addProduct:", error.message);
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
