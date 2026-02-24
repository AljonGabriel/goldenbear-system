import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddTransactions from "./AddTransactions";
import RevenueReport from "./RevenueReport";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL;

  console.log(API_BASE);
  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_BASE}/api/transactions/`)
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
      isDueSoon(t.dueDate, 5) || // due within 3 days
      target.toDateString() === today.toDateString() // due today
    );
  });

  const pendingCount = transactions.filter(
    (t) => t.status !== "Completed",
  ).length;

  // ✅ Handle reminder update
  const handleUpdateReminder = async (reminder) => {
    try {
      // Ask user for a comment (replace with modal later)
      const userComment = prompt(
        `Enter a comment for this update:
       Name: ${reminder.name}
       Barcode: ${reminder.barcode}
       Reason: ${reminder.reason}
       Due Date: ${new Date(reminder.dueDate).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}

       
Please type your comment below:`,
      );

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
      await axios.put(`${API_BASE}/api/transactions/${reminder._id}`, updated);

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

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-7xl space-y-6">
        <div className="flex gap-1">
          <AddTransactions
            transactions={transactions}
            onSetTransactions={setTransactions}
          />
          <RevenueReport transactions={transactions} />
        </div>

        {/* Reminders Section */}
        {reminders.length > 0 && (
          <div className="max-h-100 border rounded p-5 shadow">
            <div className="mb-2">
              <h2 className="text-lg font-bold">Upcoming Due</h2>
              <label className="text-sm font-medium text-gray-700">
                {pendingCount} pending transactions
              </label>
            </div>
            <ul className="space-y-2 overflow-y-autod">
              {[...reminders] // copy so we don't mutate original
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) // sort by soonest due date
                .map((r, index) => {
                  const today = new Date();
                  const target = new Date(r.dueDate);
                  const diff = (target - today) / (1000 * 60 * 60 * 24); // days difference
                  const daysLeft = Math.ceil(diff); // round up to nearest whole day

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
                  } else if (diff <= 5) {
                    bgStyle = "bg-orange-100 text-orange-700 font-semibold";
                    statusLabel = "Due Soon";
                    statusColor = "badge badge-warning";
                  }

                  return (
                    <li
                      key={r.id || r.barcode || index}
                      className={`flex justify-between items-center p-1 rounded ${bgStyle}`}
                    >
                      <span>
                        Barcode ID: <strong> {r.barcode}</strong> ({r.name}) —{" "}
                        {r.reason}
                      </span>
                      <span className="flex items-center gap-2 text-sm">
                        <span>
                          Due: {target.toLocaleDateString()}{" "}
                          {diff >= 0 ? `(${daysLeft} days left)` : ""}
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
                [...filtered] // copy array so we don’t mutate original
                  .sort((a, b) => {
                    // Put "Completed" last
                    if (a.status === "Completed" && b.status !== "Completed")
                      return 1;
                    if (a.status !== "Completed" && b.status === "Completed")
                      return -1;
                    return 0; // keep other order
                  })
                  .map((t, index) => (
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
