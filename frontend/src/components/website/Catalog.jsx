import React, { useState, useEffect } from "react";
import axios from "axios";

const Catalog = ({ fbLink }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  const API_BASE = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products/`);
        // Ensure it's an array
        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]); // fallback
      }
    };
    fetchProducts();
  }, []);

  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = Array.isArray(products)
    ? products.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const totalPages = Math.ceil(products.length / productsPerPage);

  console.log(currentProducts);

  return (
    <section
      id="catalog"
      className="max-w-7xl mx-auto px-6 py-16"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-[#B5992B] mb-8 inline-block">
        Our Catalog ✦
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#051D41]">
                {product.name}
              </h3>
              <p className="text-gray-600">₱{product.price}</p>
              <a
                href={fbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full bg-[#051D41] text-white py-2 rounded hover:bg-[#093679] text-center font-medium"
              >
                View on Facebook
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 text-[#051D41] hover:bg-[#B5992B] hover:text-white transition"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === i + 1
                ? "bg-[#B5992B] text-white"
                : "text-[#051D41] hover:bg-[#B5992B] hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 text-[#051D41] hover:bg-[#B5992B] hover:text-white transition"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Catalog;
