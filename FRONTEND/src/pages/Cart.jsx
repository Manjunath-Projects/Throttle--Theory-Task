import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([
    { id: 1, name: 'F1 Tee Black', quantity: 1, price: 49.99, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Speed Tee Red', quantity: 2, price: 54.99, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  ]);
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const updateQty = (index, delta) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity < 1) updated[index].quantity = 1;
    setCart(updated);
  };

  const deleteItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div
      className="p-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <button onClick={handleBack} className="mb-4 text-red-600 hover:underline">&larr; Back</button>
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.map((item, i) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center gap-4">
            <img src={item.image} className="w-20 h-20 object-cover rounded" alt={item.name} />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQty(i, -1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(i, 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-bold">${(item.quantity * item.price).toFixed(2)}</div>
            <button onClick={() => deleteItem(i)} className="ml-2 px-3 py-1 bg-red-200 text-red-700 rounded hover:bg-red-400">Delete</button>
          </div>
        </div>
      ))}
      <hr className="my-6" />
      <div className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</div>
      <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow">
        Proceed to Checkout
      </button>
    </motion.div>
  );
}
