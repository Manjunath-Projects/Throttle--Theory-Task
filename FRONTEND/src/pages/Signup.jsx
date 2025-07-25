import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BG_IMG = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('User registered successfully!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error(data.error || 'Registration failed.');
      }
    } catch (err) {
      toast.error('Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundImage: `url(${BG_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md">
        <button onClick={handleBack} className="mb-4 text-red-600 hover:underline">&larr; Back</button>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="name" required placeholder="Name" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80" onChange={handleChange} />
          <input name="email" type="email" required placeholder="Email" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80" onChange={handleChange} />
          <input name="password" type="password" required placeholder="Password" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80" onChange={handleChange} />
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
