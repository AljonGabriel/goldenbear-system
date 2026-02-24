import React, { useState } from "react";
import axios from "axios";
import GlobalModal from "../GlobalModal";

const AddProductForm = ({ onSetProducts }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      image: null,
    });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const res = await axios.post(`${API_BASE}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      resetForm();

      // Update table immediately with new product
      if (onSetProducts) {
        onSetProducts((prev) => [...prev, res.data.product]);
      }

      // Auto-close modal after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        Add
      </button>

      <GlobalModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add new products to your catalog"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full p-3 mb-4 border rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#B5992B]"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price (₱)"
            className="w-full p-3 mb-4 border rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#B5992B]"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#B5992B]"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Earrings">Earrings</option>
            <option value="Watch">Watch</option>
          </select>

          {/* Stock */}
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className="w-full p-3 mb-4 border rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#B5992B]"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter short product description..."
            className="w-full p-3 mb-4 border rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#B5992B]"
            rows="3"
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-[#B5992B]"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#B5992B] text-white py-3 rounded-lg font-semibold hover:bg-[#a38724] transition"
          >
            Add Product
          </button>

          {success && (
            <p className="text-green-600 text-center mt-4 font-medium">
              ✅ Product added successfully!
            </p>
          )}
        </form>
      </GlobalModal>
    </>
  );
};

export default AddProductForm;
