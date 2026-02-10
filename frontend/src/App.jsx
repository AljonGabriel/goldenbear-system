import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import WebsitePage from "./pages/WebsitePage";
import toast from "react-hot-toast";
import LoginForm from "./components/LoginForm";
import TransactionsPage from "./pages/TransactionPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/transaction" element={<TransactionsPage />} />
        <Route path="/website" element={<WebsitePage />} />
      </Routes>
    </div>
  );
};

export default App;
