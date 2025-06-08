import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("Registration successful");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="font-bold text-lg">Excel Analytics</span>
        </div>
        <nav className="flex gap-6">
          <Link to="/dashboard" className="text-gray-700 hover:underline font-medium">
            Dashboard
          </Link>
          <Link to="/login" className="text-gray-700 hover:underline">
            Login
          </Link>
          <a href="/register" className="text-gray-700 hover:underline">
            Register
          </a>
        </nav>
      </header>
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-8 bg-white rounded shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-2">Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
          >
            Register
          </button>
        </form>
      </div>
      <footer className="bg-blue-600 text-white text-center py-3 mt-8">
        © 2025 Excel Analytics. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;
