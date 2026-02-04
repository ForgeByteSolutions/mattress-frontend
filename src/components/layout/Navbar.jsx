import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

export default function Navbar({ onStart }) {
  const { totalItems } = useCart();
  return (
    <nav className="w-full sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-gray-900 hover:opacity-80 transition">
          Sleep<span className="text-blue-600">Tantrum</span>
        </Link>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-gray-600 hover:text-gray-900 transition">
            Products
          </Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition">Dashboard</Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 text-gray-600 hover:text-blue-600 transition"
          >
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>

          {onStart && (
            <button onClick={onStart} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Recommendation
            </button>
          )}
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          <button className="text-gray-700 text-2xl">☰</button>
        </div>
      </div>
    </nav>
  );
}
