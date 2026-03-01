import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { BASE_URL } from "../../services/api";

export default function AccessoryCard({ accessory }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  function handleAdd() {
    addToCart(accessory);
    alert(`${accessory.model_name} added to cart!`);
  }

  return (
    <div
      onClick={() => navigate(`/products/${accessory.product_id}`)}
      className="bg-white border rounded-xl p-4 hover:shadow-lg transition-shadow flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image */}
        <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
          {accessory.image_urls?.[0] ? (
            <img src={`${BASE_URL}${accessory.image_urls[0]}`} alt={accessory.model_name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-gray-400 text-xs">No Image</span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
            {accessory.product_type}
          </p>

          <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
            {accessory.model_name}
          </h3>

          <p className="text-xs text-gray-500">
            {accessory.brand_name}
          </p>

          {/* Price */}
          {accessory.price && (
            <p className="text-sm font-bold text-gray-900 mt-2">
              {accessory.price.currency} {accessory.price.min.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleAdd}
          className="flex-1 text-xs py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Add to Cart
        </button>
        <button
          onClick={() => navigate(`/products/${accessory.product_id}`)}
          className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          title="View Details"
        >
          🔍
        </button>
      </div>
    </div>
  );
}
