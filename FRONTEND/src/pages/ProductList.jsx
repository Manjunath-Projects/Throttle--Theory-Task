import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'F1 Tee Black', price: 49.99, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Speed Tee Red', price: 54.99, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Race Day White', price: 39.99, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
];

export default function ProductList() {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]); // local cart state
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
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
      <h2 className="text-2xl font-bold mb-4">Search Products</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6"
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="border p-4 rounded shadow hover:shadow-xl transition">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-3 rounded" />
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p>${product.price}</p>
              <button
                className={`mt-3 w-full py-2 rounded-lg text-white font-semibold transition-all ${cart.includes(product.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                onClick={() => handleAddToCart(product.id)}
                disabled={cart.includes(product.id)}
              >
                {cart.includes(product.id) ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-600 text-lg">No results found. Try another keyword.</p>
      )}
    </motion.div>
  );
}
