import React from "react";
import { Route, Routes } from "react-router";
import WebsitePage from "./pages/WebsitePage.jsx";
import TransactionsPage from "./pages/TransactionPage.jsx";
import BarcodesPage from "./pages/BarcodesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/barcode" element={<BarcodesPage />} />
        <Route path="/transaction" element={<TransactionsPage />} />
        <Route path="/website" element={<WebsitePage />} />
      </Routes>
    </div>
  );
};

export default App;
