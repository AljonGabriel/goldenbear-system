import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hard-coded account
  const hardcodedUser = {
    email: "test@goldenbear.com",
    password: "123456",
  };

  const handleLogin = () => {
    if (
      form.email === hardcodedUser.email &&
      form.password === hardcodedUser.password
    ) {
      setError("");
      navigate("/transaction"); // ✅ redirect to HomePage
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">GoldenBear Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input input-bordered w-full"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input input-bordered w-full"
          />

          <button onClick={handleLogin} className="btn btn-primary w-full mt-4">
            Login
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
