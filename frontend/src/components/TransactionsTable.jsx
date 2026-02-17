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
      .get("http://localhost:5000/api/transactions/")
      .then((res) => {
        if (isMounted) setTransactions(res.data);
      })
      .catch(() => toast.error("Failed to fetch transactions"));
    return () => {
      isMounted = false;
    };
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  // ✅ Search by name OR barcode
  const filtered = transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.barcode && t.barcode.toLowerCase().includes(search.toLowerCase())),
  );

  const isDueSoon = (dueDate, days) => {
    if (!dueDate) return false;
    const today = new Date();
    const target = new Date(dueDate);
    const diff = (target - today) / (1000 * 60 * 60 * 24); // difference in days
    return diff >= 0 && diff <= days;
  };

  // Filter reminders (due today, within 3 days, or overdue)
  const reminders = transactions.filter((t) => {
    if (!t.reason || !t.dueDate) return false;
    const today = new Date();
    const target = new Date(t.dueDate);
    const diff = (target - today) / (1000 * 60 * 60 * 24);

    return (
      diff < 0 || // overdue
      isDueSoon(t.dueDate, 3) || // due within 3 days
      target.toDateString() === today.toDateString() // due today
    );
  });

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactions transactions={transactions} />

        {/* Reminders Section */}
        {reminders.length > 0 && (
          <div className="">
            <h2 className="text-lg font-bold mb-2">Upcoming due</h2>
            <ul className="space-y-2">
              {reminders.map((r, index) => {
                const today = new Date();
                const target = new Date(r.dueDate);
                const diff = (target - today) / (1000 * 60 * 60 * 24);

                // ✅ Color-coded background styles
                let bgStyle = "bg-gray-100 text-gray-800";
                if (diff < 0)
                  bgStyle = "bg-red-100 text-red-700 font-bold"; // overdue
                else if (target.toDateString() === today.toDateString())
                  bgStyle = "bg-blue-100 text-blue-700 font-semibold"; // due today
                else if (diff <= 3)
                  bgStyle = "bg-orange-100 text-orange-700 font-semibold"; // due soon

                return (
                  <li
                    key={r.id || r.barcode || index}
                    className={`flex justify-between p-2 rounded ${bgStyle}`}
                  >
                    <span>
                      <strong>{r.name}</strong> ({r.barcode}) — {r.reason}
                    </span>
                    <span className="text-sm">
                      Due: {new Date(r.dueDate).toLocaleDateString()}
                    </span>
                    <button className="btn btn-sm bg-success border-none">
                      Update
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Search Bar */}
        <label className="block text-sm font-medium text-gray-700">
          Search barcode or names
        </label>

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
                <th>Barcode #</th>
                <th>Name</th>
                <th>Price</th>
                <th>Transaction Date</th>
                <th>Reason</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((t, index) => (
                  <tr key={t.id || t.barcode || index}>
                    <td>{t.barcode}</td>
                    <td>{t.name}</td>
                    <td>&#8369; {t.price}</td>
                    <td>{formatDateTime(t.date)}</td>
                    <td>{t.reason || "-"}</td>
                    <td>
                      {t.dueDate
                        ? new Date(t.dueDate).toLocaleDateString("en-PH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "-"}
                    </td>
                    <td>
                      <label className="block text-sm font-medium text-gray-700">
                        {t.status || "Update soon"}
                      </label>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500">
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
