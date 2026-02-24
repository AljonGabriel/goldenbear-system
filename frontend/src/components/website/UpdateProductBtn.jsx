import React, { useState, useEffect } from "react";
import axios from "axios";
import GlobalModal from "../GlobalModal";

// Define your API base (adjust if you use env vars)
const API_BASE = import.meta.env.VITE_API_URL;

const UpdateProductBtn = ({ product, onSetProducts }) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageUrl: "",
    image: null, // file object
  });

  // Preload product data when modal opens
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
        stock: product.stock || "",
        imageUrl: product.imageUrl || "",
        image: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("stock", formData.stock);

      if (formData.image) {
        form.append("image", formData.image);
      }

      const { data } = await axios.put(
        `${API_BASE}/api/products/${product._id}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      // ✅ Call the correctly named prop
      onSetProducts((prev) =>
        prev.map((prod) => (prod._id === data._id ? data : prod)),
      );

      setOpen(false);
    } catch (err) {
      console.error(
        "Error updating product:",
        err.response?.data || err.message,
      );
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit
      </button>

      <GlobalModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Update Product"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border rounded px-3 py-2"
          />

          {/* Show current image preview */}
          {formData.imageUrl && (
            <img
              src={`${API_BASE}${formData.imageUrl}`}
              alt="Current product"
              className="w-32 h-32 object-cover rounded border"
            />
          )}

          {/* File input for new image */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#051D41] text-white rounded hover:bg-[#093679]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </GlobalModal>
    </>
  );
};

export default UpdateProductBtn;
