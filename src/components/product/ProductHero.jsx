import { BASE_URL } from "../../services/api";

export default function ProductHero({ product }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="bg-gray-100 rounded-xl h-[360px] flex items-center justify-center overflow-hidden">
        {product.image_urls?.length > 0 ? (
          <img
            src={`${BASE_URL}${product.image_urls[0]}`}
            alt={product.model_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Product Image</span>
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold">{product.model_name}</h1>
        <p className="mt-2 text-gray-600">{product.mattress_type}</p>

        <div className="mt-6 text-xl font-semibold text-blue-600">
          {product.price?.min > 0
            ? `RM ${product.price.min} – ${product.price.max}`
            : "Price on request"}
        </div>

        <p className="mt-4 text-gray-700">{product.notes}</p>
      </div>
    </div>
  );
}
