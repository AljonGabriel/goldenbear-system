import { useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", price: "", date: "" });

  const handleAdd = () => {
    if (!form.name || !form.price || !form.date) return;
    setTransactions([...transactions, form]);
    setForm({ name: "", price: "", date: "" });
  };

  const filtered = transactions.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Transactions</h1>

        {/* Search Bar */}
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Add Transaction Form */}
        <div className="card bg-base-200 shadow-md p-4 space-y-4">
          <h2 className="text-xl font-bold">Add Transaction</h2>
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
            Add Transaction
          </button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={i}>
                  <td>{t.name}</td>
                  <td>${t.price}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
