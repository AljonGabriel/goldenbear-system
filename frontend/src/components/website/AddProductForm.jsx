import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    if (product.image) {
      formData.append("image", product.image); // ✅ must match upload.single("image")
    }

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#051D41] via-[#0A2C66] to-[#123B73]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-[#B5992B]"
      >
        <h2 className="text-2xl font-extrabold text-center mb-6 text-[#051D41]">
          Add New Product
        </h2>

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
    </div>
  );
};

export default AddProductForm;
