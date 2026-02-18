import React, { useState } from "react";
import GlobalModal from "./GlobalModal.jsx";

const RevenueReport = ({ transactions }) => {
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Completed by month for selected year
  const completedByMonth = transactions
    .filter(
      (t) =>
        t.status === "Completed" &&
        new Date(t.completedAt || t.date).getFullYear() === selectedYear,
    )
    .reduce((acc, t) => {
      const date = new Date(t.completedAt || t.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      acc[monthKey] = (acc[monthKey] || 0) + Number(t.price);
      return acc;
    }, {});

  // Completed by year (all years)
  const completedByYear = transactions
    .filter((t) => t.status === "Completed")
    .reduce((acc, t) => {
      const year = new Date(t.completedAt || t.date).getFullYear();
      acc[year] = (acc[year] || 0) + Number(t.price);
      return acc;
    }, {});

  const today = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate year options starting from 2025 up to current year
  const yearOptions = [];
  for (let y = 2025; y <= today.getFullYear(); y++) {
    yearOptions.push(y);
  }

  return (
    <div>
      {/* Trigger button for modal */}
      <button
        onClick={() => setOpen(true)}
        className="btn bg-yellow-600 text-white"
      >
        Revenue Report
      </button>

      {/* Global Modal */}
      <GlobalModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Revenue Report"
      >
        {/* Year Selector */}
        <div className="mb-4">
          <label className="mr-2 font-semibold text-gray-700">
            Select Year:
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Monthly + Yearly Revenue (one section) */}
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-bold text-yellow-700 mb-3">
            Completed Revenue by Month ({selectedYear})
          </h2>
          <div className="divide-y">
            {months.map((monthName, idx) => {
              const monthKey = `${selectedYear}-${idx + 1}`;
              const total = completedByMonth[monthKey] || 0;

              const monthDate = new Date(selectedYear, idx);
              const isPast =
                monthDate < new Date(today.getFullYear(), today.getMonth(), 1);

              return (
                <div
                  key={monthKey}
                  className="flex justify-between items-center py-2"
                >
                  <span className="font-medium text-gray-700">
                    {monthName} {selectedYear}
                  </span>
                  <span className="text-green-700 font-semibold">
                    ₱{total.toFixed(2)}
                    {!isPast && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Ongoing)
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Whole Year Summary at the bottom */}
          <div className="mt-4 border-t pt-3">
            <h3 className="text-md font-bold text-green-700 mb-2">
              Total Completed Revenue ({selectedYear})
            </h3>
            <span className="text-green-700 font-bold text-lg">
              ₱{(completedByYear[selectedYear] || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </GlobalModal>
    </div>
  );
};

export default RevenueReport;
