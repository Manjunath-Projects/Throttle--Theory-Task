import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    { name: 'Tees', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
    { name: 'Jackets', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
    { name: 'Caps', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Accessories', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
    { name: 'Limited', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <motion.div
      className="font-sans text-gray-900"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white py-24 text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h1 className="text-5xl font-extrabold uppercase tracking-widest drop-shadow-md">
          STREETDRIVE™
        </h1>
        <p className="mt-4 text-xl drop-shadow-sm">Where Formula 1 meets streetwear.</p>
        <Link to="/product">
          <button className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg text-lg shadow-md transition-transform hover:scale-105">
            View All
          </button>
        </Link>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {categories.map((cat, i) => (
            <Link
              to={i === 0 ? '/category/tees' : '#'}
              key={cat.name}
              className={`p-6 border rounded-xl shadow-lg bg-white hover:scale-105 transition-all duration-300 ${
                i === 0 ? 'hover:bg-red-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
              aria-disabled={i !== 0}
            >
              <img src={cat.img} alt={cat.name} className="w-20 h-20 object-cover mx-auto mb-3 rounded-full border" />
              {cat.name}
            </Link>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
