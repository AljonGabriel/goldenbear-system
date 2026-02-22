import React, { useState } from "react";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the product (later you can send to backend)
    console.log("New Product:", product);

    // Reset form
    setProduct({ name: "", price: "", description: "", image: "" });
    setSuccess(true);

    // Hide success after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#051D41] mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="e.g. Elegant Gold Ring"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5992B]"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#051D41] mb-1">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="₱12,500"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5992B]"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#051D41] mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Short product description..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5992B]"
            rows="3"
          />
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#051D41] mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/product.jpg"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5992B]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#B5992B] text-white py-3 rounded-lg font-semibold hover:bg-[#a38724] transition"
        >
          Add Product
        </button>

        {/* Success Message */}
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
