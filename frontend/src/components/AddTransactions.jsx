import React, { useState, useEffect } from "react";
import axios from "axios";
import GlobalModal from "./GlobalModal.jsx";
import { toast } from "react-hot-toast";

const AddTransactions = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", date: "" });
  const [transactions, setTransactions] = useState([]);

  // Add transaction to backend
  const handleAdd = async () => {
    if (!form.name || !form.price || !form.date) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/transactions/",
        form,
      );

      setTransactions([...transactions, res.data]);
      setForm({ name: "", price: "", date: "" });
      setOpen(false);
      toast.success("Transaction added successfully!");
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        Add
      </button>

      {/* Global Modal */}
      <GlobalModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Transaction"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="input input-bordered w-full"
          />
          <button onClick={handleAdd} className="btn btn-primary w-full">
            Save Transaction
          </button>
        </div>
      </GlobalModal>
    </div>
  );
};

export default AddTransactions;
