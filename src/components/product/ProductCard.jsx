import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/products/${product.product_id}`)} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">

            {/* Image */}
            <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.image_urls?.length > 0 ? (
                    <img
                        src={`${BASE_URL}${product.image_urls[0]}`}
                        alt={product.model_name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="text-gray-400">No Image</span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                    {product.model_name}
                </h3>

                <p className="text-sm text-gray-500">
                    {product.mattress_type}
                </p>

                <p className="text-sm text-gray-600">
                    Firmness: <span className="font-medium">
                        {product.comfort.firmness_level}
                    </span>
                </p>

                <p className="text-sm text-gray-600">
                    Cooling: <span className="font-medium">
                        {product.health_features.cooling_feature}
                    </span>
                </p>

                {/* Price */}
                <div className="pt-3">
                    <p className="text-lg font-bold text-blue-600">
                        {product.price.currency} {product.price.min.toLocaleString()} – {product.price.max.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
