import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import axios from "axios";
import toast from "react-hot-toast";

const BarcodeGenerator = () => {
  const [prefix, setPrefix] = useState("GB-2026-");
  const [count, setCount] = useState(10);
  const [codes, setCodes] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fetch existing transactions once
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions/")
      .then((res) => {
        console.log(res.data); // 👀 see what field holds the barcode
        setTransactions(res.data);
      })
      .catch(() => toast.error("Failed to fetch transactions"));
  }, []);

  // Generate codes and skip duplicates
  const generateCodes = () => {
    const newCodes = [];
    let i = 1;

    while (newCodes.length < count) {
      const candidate = `${prefix}${String(i).padStart(3, "0")}`;

      // ✅ Match the actual field name from your transactions table
      const exists = transactions.some((t) => t.barcode === candidate);

      if (!exists) {
        newCodes.push(candidate);
      }
      i++;
    }

    setCodes(newCodes);
  };

  // Print barcodes
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 min-h-screen bg-base-200 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold">Barcode Generator</h1>

        {/* Input Controls */}
        <div className="card bg-base-100 p-4 space-y-4 shadow-md">
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="Enter prefix (e.g., GB-2026-)"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            placeholder="How many codes?"
            className="input input-bordered w-full"
          />
          <button onClick={generateCodes} className="btn btn-primary w-full">
            Generate Unique Codes
          </button>
        </div>

        {/* Barcode Display */}
        {codes.length > 0 && (
          <div className="grid grid-cols-2 gap-8 bg-base-100 p-6 rounded-lg shadow-md">
            {codes.map((code) => (
              <div
                key={code}
                className="flex flex-col items-center border border-gray-400 rounded-md p-4 bg-white"
              >
                {/* Shrink barcode by adjusting width & height */}
                <Barcode value={code} width={1.5} height={60} fontSize={14} />
                <p className="mt-2 text-sm font-bold">{code}</p>
              </div>
            ))}
          </div>
        )}

        {/* Print Button */}
        {codes.length > 0 && (
          <button onClick={handlePrint} className="btn btn-secondary w-full">
            Print Barcodes
          </button>
        )}
      </div>
    </div>
  );
};

export default BarcodeGenerator;
