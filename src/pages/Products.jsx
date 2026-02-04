import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../services/products.service";
import ProductCard from "../components/product/ProductCard";
import ProductFilters from "../components/product/ProductFilters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    product_type: [],
    brand_name: [],
    audience: [],
    firmness: []
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts();
        // Handle both { products: [] } and [] responses
        const data = Array.isArray(response) ? response : (response.products || []);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const clearFilters = () => {
    setFilters({
      product_type: [],
      brand_name: [],
      audience: [],
      firmness: []
    });
  };

  const availableValues = useMemo(() => {
    return {
      productTypes: [...new Set(products.map(p => p.product_type))].filter(Boolean).sort(),
      brands: [...new Set(products.map(p => p.brand_name))].filter(Boolean).sort(),
      audiences: [...new Set(products.map(p => p.audience))].filter(Boolean).sort(),
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Product Type Match
      const typeMatch = filters.product_type.length === 0 ||
        filters.product_type.includes(p.product_type);

      // 2. Brand Match
      const brandMatch = filters.brand_name.length === 0 ||
        filters.brand_name.includes(p.brand_name);

      // 3. Audience Match (Case-insensitive just in case)
      const audienceMatch = filters.audience.length === 0 ||
        filters.audience.some(a => a?.toLowerCase() === p.audience?.toLowerCase());

      // 4. Firmness Match
      const firmnessMatch = filters.firmness.length === 0 ||
        filters.firmness.includes(p.comfort?.firmness_level);

      return typeMatch && brandMatch && audienceMatch && firmnessMatch;
    });
  }, [products, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Our Collection
          </h1>
          <p className="mt-2 text-gray-500 max-w-lg">
            Find the perfect sleep solution tailored to your comfort and health needs.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold shadow-sm"
        >
          <span>🔍</span> Filters
          {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : false) && (
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto bg-white border border-gray-100 rounded-2xl p-6 shadow-sm custom-scrollbar">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              availableValues={availableValues}
              clearFilters={clearFilters}
            />
          </div>
        </aside>

        {/* Products Grid Area */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
              <div className="text-4xl mb-4">🏜️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your filters to find what you're looking for.</p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-gray-400 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                availableValues={availableValues}
                clearFilters={clearFilters}
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="mt-6 w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
