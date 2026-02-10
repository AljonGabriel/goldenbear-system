import React from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-6">
        <h1 className="text-2xl font-bold">Welcome to GoldenBear System</h1>
        <p className="mt-2">This is your home dashboard.</p>
      </div>
    </div>
  );
};

export default HomePage;
