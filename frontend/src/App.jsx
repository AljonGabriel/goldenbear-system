import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import WebsitePage from "./pages/WebsitePage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Website" element={<WebsitePage />} />
      </Routes>
    </div>
  );
};

export default App;
