import React from "react";
import { Route, Routes } from "react-router";
import TransactionsPage from "./pages/TransactionPage.jsx";
import BarcodesPage from "./pages/BarcodesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/barcode" element={<BarcodesPage />} />
        <Route path="/transaction" element={<TransactionsPage />} />
        <Route path="/website" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
