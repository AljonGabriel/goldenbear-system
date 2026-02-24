import React, { useState } from "react";
import axios from "axios";
import GlobalModal from "./GlobalModal.jsx";
import { toast } from "react-hot-toast";

const AddTransactions = ({ transactions, onSetTransactions }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    barcode: "",
    name: "",
    price: "",
    date: new Date().toISOString(), // auto-set to today
    reason: "",
    dueDate: "",
    status: "Pending",
  });

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleAdd = async () => {
    // Clean up form values (remove ALL spaces)
    const cleanedForm = {
      ...form,
      name: form.name.trim(),
      barcode: form.barcode.replace(/\s+/g, ""), // ✅ removes all spaces
      reason: form.reason.trim(),
      dueDate: form.dueDate.trim(),
      price: String(form.price).trim(),
    };

    // Check if barcode already exists
    const barcodeExists = transactions.some(
      (t) => t.barcode.replace(/\s+/g, "") === cleanedForm.barcode,
    );

    if (
      !cleanedForm.name ||
      !cleanedForm.price ||
      !cleanedForm.barcode ||
      !cleanedForm.dueDate ||
      !cleanedForm.reason ||
      barcodeExists
    ) {
      toast.error(
        barcodeExists ? "Barcode already exists" : "Please fill in all fields",
      );
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/api/transactions/`,
        cleanedForm,
      );

      // ✅ Update transactions immediately
      onSetTransactions((prev) => [res.data.transaction, ...prev]);

      // Reset form after success
      setForm({
        barcode: "",
        name: "",
        price: "",
        date: new Date().toISOString(),
        reason: "",
        dueDate: "",
        status: "None",
      });
      setOpen(false);
      toast.success("Transaction added successfully!");
    } catch (err) {
      console.error("Error adding transaction:", err);
      toast.error("Failed to add transaction");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        Add
      </button>

      {/* Global Modal */}
      <GlobalModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="New Transaction"
      >
        <div className="space-y-4">
          {/* Barcode */}
          <input
            type="text"
            placeholder="Scan barcode"
            value={form.barcode}
            onChange={(e) => setForm({ ...form, barcode: e.target.value })}
            className="input input-bordered w-full"
          />

          {/* Name */}

          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input input-bordered w-full"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="input input-bordered w-full"
          />

          {/* Transaction Date (auto-set, read-only) */}
          <label className="text-sm font-medium text-gray-700">
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
              <label className="text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                min={new Date().toISOString().split("T")[0]} // ✅ disables past dates
                className="input input-bordered w-full"
              />
            </>
          )}

          <button onClick={handleAdd} className="btn btn-primary w-full">
            Save Transaction
          </button>
        </div>
      </GlobalModal>
    </>
  );
};

export default AddTransactions;
