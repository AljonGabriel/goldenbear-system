import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddProductForm from "./AddProductForm";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL;

  console.log(API_BASE);
  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_BASE}/api/products/`)
      .then((res) => {
        if (isMounted) setProducts(res.data);
      })
      .catch(() => toast.error("Failed to fetch transactions"));
    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Search by name OR barcode
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.barcode && p.barcode.toLowerCase().includes(search.toLowerCase())),
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/products/${id}`);

      // Update table immediately by removing the deleted product
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(
        "Error deleting product:",
        err.response?.data || err.message,
      );
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-7xl space-y-6">
        <div className="flex gap-1">
          <AddProductForm onSetProducts={setProducts} />
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or barcode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />
        {/* Transactions Table */}
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Image</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                [...filtered]
                  .sort((a, b) => {
                    if (a.status === "Completed" && b.status !== "Completed")
                      return 1;
                    if (a.status !== "Completed" && b.status === "Completed")
                      return -1;
                    return 0;
                  })
                  .map((p, index) => (
                    <tr key={p.id || p.barcode || index}>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{p.category}</td>
                      <td>
                        <img
                          src={`${API_BASE}${p.imageUrl}`}
                          alt={p.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td>{p.stock}</td>
                      <td className="space-x-2">
                        <button
                          onClick={() => handleEdit(p.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
