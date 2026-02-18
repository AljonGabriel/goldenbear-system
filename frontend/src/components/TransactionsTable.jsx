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
    const diff = (target - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= days;
  };

  // Filter reminders (due today, within 3 days, or overdue)
  // ✅ Exclude completed reminders
  const reminders = transactions.filter((t) => {
    if (!t.reason || !t.dueDate) return false;
    if (t.status === "Completed") return false; // ✅ skip completed

    const today = new Date();
    const target = new Date(t.dueDate);
    const diff = (target - today) / (1000 * 60 * 60 * 24);

    return (
      diff < 0 || // overdue
      isDueSoon(t.dueDate, 3) || // due within 3 days
      target.toDateString() === today.toDateString() // due today
    );
  });

  // ✅ Handle reminder update
  const handleUpdateReminder = async (reminder) => {
    try {
      // Ask user for a comment (replace with modal later)
      const userComment = prompt("Enter a comment for this update:");

      if (!userComment) {
        toast.error("Update cancelled — comment required");
        return;
      }

      // Build updated object (keep reason intact, only change status + comment + completedAt)
      const updated = {
        ...reminder,
        status: "Completed",
        comment: userComment,
        completedAt: new Date(),
      };

      // Send update to backend
      await axios.put(
        `http://localhost:5000/api/transactions/${reminder._id}`,
        updated,
      );

      // Update local state
      setTransactions((prev) =>
        prev.map((t) => (t._id === reminder._id ? updated : t)),
      );

      toast.success("Reminder updated successfully!");
    } catch (err) {
      console.error("Error updating reminder:", err);
      toast.error("Failed to update reminder");
    }
  };

  console.log(reminders);

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-7xl space-y-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactions transactions={transactions} />

        {/* Reminders Section */}
        {reminders.length > 0 && (
          <div className="">
            <h2 className="text-lg font-bold mb-2">Upcoming Due</h2>
            <ul className="space-y-2">
              {reminders.map((r, index) => {
                const today = new Date();
                const target = new Date(r.dueDate);
                const diff = (target - today) / (1000 * 60 * 60 * 24);

                // ✅ Color-coded background styles
                let bgStyle = "bg-gray-100 text-gray-800";
                let statusLabel = "Pending";
                let statusColor = "badge badge-neutral";

                if (diff < 0) {
                  bgStyle = "bg-red-100 text-red-700 font-bold";
                  statusLabel = "Overdue";
                  statusColor = "badge badge-error";
                } else if (target.toDateString() === today.toDateString()) {
                  bgStyle = "bg-blue-100 text-blue-700 font-semibold";
                  statusLabel = "Due Today";
                  statusColor = "badge badge-info";
                } else if (diff <= 3) {
                  bgStyle = "bg-orange-100 text-orange-700 font-semibold";
                  statusLabel = "Due Soon";
                  statusColor = "badge badge-warning";
                }

                return (
                  <li
                    key={r.id || r.barcode || index}
                    className={`flex justify-between items-center p-2 rounded ${bgStyle}`}
                  >
                    <span>
                      <strong>{r.name}</strong> ({r.barcode}) — {r.reason}
                    </span>
                    <span className="flex items-center gap-2 text-sm">
                      <span>
                        Due: {new Date(r.dueDate).toLocaleDateString()}
                      </span>
                      <span className={statusColor}>{statusLabel}</span>
                      <button
                        onClick={() => handleUpdateReminder(r)}
                        className="btn btn-sm bg-success text-white border-none"
                      >
                        Update
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Search Bar */}
        <label className=" text-sm font-medium ">Search barcode or names</label>
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
                <th>Comment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((t, index) => (
                  <tr key={t.id || t.barcode || index}>
                    <td>{t.barcode}</td>
                    <td>{t.name}</td>
                    <td>₱{t.price.toFixed(2)}</td>
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
                    <td>{t.comment}</td>
                    <td>
                      {t.status === "Completed" ? (
                        <div className="flex flex-col">
                          <span className="font-semibold text-green-600">
                            Completed
                          </span>
                          <span className="text-xs text-gray-500">
                            {t.completedAt
                              ? new Date(t.completedAt).toLocaleDateString(
                                  "en-PH",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )
                              : ""}
                          </span>
                        </div>
                      ) : (
                        <span className="font-semibold text-red-600">
                          {t.status || "Pending"}
                        </span>
                      )}
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

export default TransactionsTable;
