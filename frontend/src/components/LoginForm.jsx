import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded account
    const validUser = "admin";
    const validPass = "goldenbear123";

    if (username === validUser && password === validPass) {
      localStorage.setItem("isLoggedIn", "true");
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (loggedIn) {
    return <Navigate to="/transaction" replace />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#051D41]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-[#051D41]">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#B5992B] text-white py-2 rounded hover:bg-[#a38724]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
