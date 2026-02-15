import { useState } from "react";
import Navbar from "../components/Navbar";
import AddTransactions from "../components/AddTransactions.jsx";
import TransactionsTable from "../components/TransactionsTable.jsx";
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
    <>
      <Navbar />
      <TransactionsTable />
    </>
  );
}
