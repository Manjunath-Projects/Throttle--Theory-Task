// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BG_IMG = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Login successful!");
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error(data.error || "Login failed.");
      }
    } catch (err) {
      toast.error("Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundImage: `url(${BG_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md">
        <button onClick={handleBack} className="mb-4 text-red-600 hover:underline">&larr; Back</button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">Login</h2>
          <input type="email" required placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80" />
          <input type="password" required placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80" />
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-red-600 hover:underline">Forgot Password?</Link>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow transition">Login</button>
        </form>
      </div>
    </div>
  );
}
