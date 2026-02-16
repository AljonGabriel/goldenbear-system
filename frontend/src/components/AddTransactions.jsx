import React, { useState } from "react";
import axios from "axios";
import GlobalModal from "./GlobalModal.jsx";
import { toast } from "react-hot-toast";

const AddTransactions = ({ onTransactionAdded }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    barcode: "",
    name: "",
    price: "",
    date: new Date().toISOString(), // auto-set to today
    reason: "",
    dueDate: "",
  });

  // Add transaction to backend
  const handleAdd = async () => {
    if (
      !form.name ||
      !form.price ||
      !form.barcode ||
      !form.dueDate ||
      !form.reason
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/transactions/",
        form,
      );

      // Pass new transaction back to parent if callback provided
      if (onTransactionAdded) {
        onTransactionAdded(res.data);
      }

      // Reset form after success (date always resets to today)
      setForm({
        barcode: "",
        name: "",
        price: "",
        date: new Date().toISOString(),
        reason: "",
        dueDate: "",
      });
      setOpen(false);
      toast.success("Transaction added successfully!");
    } catch (err) {
      console.error("Error adding transaction:", err);
      toast.error("Failed to add transaction");
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
          {/* Barcode */}
          <label className="block text-sm font-medium text-gray-700">
            Barcode
          </label>
          <input
            type="text"
            placeholder="Enter barcode"
            value={form.barcode}
            onChange={(e) => setForm({ ...form, barcode: e.target.value })}
            className="input input-bordered w-full"
          />

          {/* Name */}
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input input-bordered w-full"
          />

          {/* Price */}
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="input input-bordered w-full"
          />

          {/* Transaction Date (auto-set, read-only) */}
          <label className="block text-sm font-medium text-gray-700">
            Transaction Date
          </label>
          <input
            type="text"
            value={new Date(form.date).toLocaleDateString()}
            readOnly
            disabled
            className="input input-bordered w-full cursor-not-allowed"
          />

          {/* Reason Dropdown */}
          <label className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <select
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="">Select reason</option>
            <option value="Pending Payment">Pending Payment</option>
            <option value="Item Pickup">Item Pickup</option>
          </select>

          {/* Due Date (only shows if reason selected) */}
          {form.reason && (
            <>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="input input-bordered w-full"
              />
            </>
          )}

          <button onClick={handleAdd} className="btn btn-primary w-full">
            Save Transaction
          </button>
        </div>
      </GlobalModal>
    </div>
  );
};

export default AddTransactions;
