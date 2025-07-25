import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Category() {
  const navigate = useNavigate();
  // Static placeholder data for Tees
  const products = [
    {
      id: 1,
      name: 'F1 Street Tee',
      price: '39.99',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Grand Prix Tee',
      price: '42.00',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'Pole Position Tee',
      price: '36.50',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      name: 'Pit Crew Tee',
      price: '40.00',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 5,
      name: 'Speedster Tee',
      price: '38.00',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <motion.div
      className="p-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <button onClick={handleBack} className="mb-4 text-red-600 hover:underline">&larr; Back</button>
      <h2 className="text-3xl font-bold mb-6">Tees Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <Link
            to="/product"
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-xl transition-all"
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700 mt-1">${product.price}</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
