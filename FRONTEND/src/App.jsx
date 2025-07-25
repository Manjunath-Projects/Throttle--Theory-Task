import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Category from './pages/Category';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  const location = useLocation();
  const hideAuth = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="bg-[#f9fafb] min-h-screen font-sans">
      {/* Top Navigation Bar with non-functional icons */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm mb-4">
        <Link to="/" className="text-2xl font-extrabold tracking-widest text-red-600">STREETDRIVE™</Link>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 opacity-60 cursor-not-allowed" title="Wishlist (coming soon)">
            {/* Heart SVG icon */}
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" /></svg>
            <span className="hidden sm:inline">Wishlist</span>
          </span>
          <span className="flex items-center gap-1 opacity-60 cursor-not-allowed" title="Profile (coming soon)">
            {/* User SVG icon */}
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M2 20c0-4 8-6 10-6s10 2 10 6" /></svg>
            <span className="hidden sm:inline">Profile</span>
          </span>
          <Link to="/cart" className="flex items-center gap-1 text-red-600 hover:underline">
            {/* Cart SVG icon */}
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
            <span className="hidden sm:inline">Cart</span>
          </Link>
          {!hideAuth && (
            <>
              <Link to="/login" className="ml-2 px-4 py-2 rounded border border-red-600 text-red-600 hover:bg-red-50 transition">Login</Link>
              <Link to="/signup" className="ml-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
      {/* AnimatePresence enables exit/enter animations on route change */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/category/tees" element={<Category />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
