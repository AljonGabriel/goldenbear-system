import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddTransactions from "./AddTransactions";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;
    axios
      .get("http://localhost:5000/api/transactions")
      .then((res) => {
        if (isMounted) setTransactions(res.data);
      })
      .catch(() => toast.error("Failed to fetch transactions"));
    return () => {
      isMounted = false;
    }; // cleanup
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(transactions.filter((t) => t.id !== id));
      toast.success("Transaction deleted");
    } catch {
      toast.error("Error deleting transaction");
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const filtered = transactions.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactions />

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name..."
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
                <th>Price</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((t) => (
                  <tr key={t.id}>
                    <td>{t.name}</td>
                    <td>${t.price}</td>
                    <td>{formatDateTime(t.date)}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500">
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

export default TransactionsTable;
