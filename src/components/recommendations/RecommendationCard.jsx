import { useNavigate } from "react-router-dom";
import ProductActions from "../product/ProductActions";

export default function RecommendationCard({ item }) {
  const navigate = useNavigate();
  const { product, score } = item;

  return (
    <div
      onClick={() => navigate(`/products/${product.product_id}`)}
      className="cursor-pointer rounded-xl p-5 bg-blue-50 hover:bg-blue-100 transition flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {product.model_name}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            Firmness: {product.comfort.firmness_level}
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold whitespace-nowrap">
          {score}% Match
        </div>
      </div>

      {/* 👇 Button container with stopPropagation to prevent card click */}
      <div onClick={(e) => e.stopPropagation()}>
        <ProductActions product={product} compact={true} />
      </div>
    </div>
  );
}
