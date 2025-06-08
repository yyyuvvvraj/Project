import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      alert("Login successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); 
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded w-96 bg-white shadow-lg">
          <h2 className="text-xl font-bold">Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
          <Link to="/register" className="text-blue-600 hover:underline mt-2 block text-center">
            New user? Register here
          </Link>
        </form>
      </div>
      <footer className="bg-blue-600 text-white text-center py-3 mt-8">
        © 2025 Excel Analytics. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;