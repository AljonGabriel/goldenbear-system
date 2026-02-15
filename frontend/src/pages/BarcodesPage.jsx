import React from "react";
import Navbar from "../components/Navbar.jsx";
import BarcodeGenerator from "../components/BarcodeGenerator.jsx";

const BarcodesPage = () => {
  return (
    <div>
      <Navbar />
      <BarcodeGenerator />
    </div>
  );
};

export default BarcodesPage;
