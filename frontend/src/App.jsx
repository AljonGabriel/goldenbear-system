import React from "react";
import { Route, Routes } from "react-router";
import TransactionsPage from "./pages/TransactionPage.jsx";
import BarcodesPage from "./pages/BarcodesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/barcode"
          element={
            <ProtectedRoute>
              <BarcodesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <AddProductPage />
            </ProtectedRoute>
          }
        />

        <Route path="/website" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
