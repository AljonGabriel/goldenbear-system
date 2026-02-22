import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  const [error, setError] = useState(""); // track error message

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded account
    const validUser = "admin";
    const validPass = "goldenbear123";

    if (username === validUser && password === validPass) {
      localStorage.setItem("isLoggedIn", "true");
      setLoggedIn(true);
      setError(""); // clear error if successful
    } else {
      setError("Invalid username or password"); // show error text
    }
  };

  if (loggedIn) {
    return <Navigate to="/transaction" replace />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#051D41] via-[#0A2C66] to-[#123B73]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border border-[#B5992B]"
      >
        {/* Logo + Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/tablogo.png" // <-- replace with your logo path
            alt="GoldenBear Logo"
            className="h-16 w-16 rounded-full mb-3 border-2 border-[#B5992B]"
          />
          <h2 className="text-2xl font-extrabold text-center text-[#051D41]">
            GoldenBear System
          </h2>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#051D41] mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5992B]"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-[#051D41] mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5992B]"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#B5992B] text-white py-3 rounded-lg font-semibold hover:bg-[#a38724] transition"
        >
          Login
        </button>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-500 mt-4">
          Authorized access only
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
