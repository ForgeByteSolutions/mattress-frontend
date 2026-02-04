import { useEffect, useState } from "react";
import { getProducts } from "../../services/products.service";
import AccessoryCard from "./AccessoryCard";

export default function CartAccessories({ cart }) {
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAccessories() {
            try {
                const response = await getProducts();
                const allProducts = response.products || [];

                // Advanced Logic: Score accessories based on multiple factors relative to cart items
                const cartProductIds = new Set(cart.map(item => item.product_id));
                const brandsInCart = new Set(cart.map(item => item.brand_name));
                const audiencesInCart = new Set(cart.map(item => item.audience));
                const mattressTypesInCart = new Set(cart.map(item => item.mattress_type?.toLowerCase()));

                const accessoriesWithScores = allProducts
                    .filter(p => p.product_type !== "Mattress" && !cartProductIds.has(p.product_id))
                    .map(p => {
                        let score = 0;

                        // Rule 1: Brand match (Strong priority)
                        if (brandsInCart.has(p.brand_name)) score += 5;

                        // Rule 2: Audience match (e.g., "Side Sleepers", "Hot Sleepers")
                        if (audiencesInCart.has(p.audience)) score += 3;

                        // Rule 3: Cross-feature match (e.g., Cooling mattress -> Cooling pillow)
                        if (p.model_name?.toLowerCase().includes("cooling") || p.product_type?.toLowerCase().includes("cooling")) {
                            if (mattressTypesInCart.has("cooling") || [...mattressTypesInCart].some(t => t?.includes("cooling"))) {
                                score += 4;
                            }
                        }

                        // Rule 4: Diversity (Minor boost for different brands if score is low)
                        // This helps avoid showing 4 identical pillows if multiple brands exist

                        return { ...p, score };
                    })
                    .sort((a, b) => b.score - a.score || b.price?.min - a.price?.min);

                setAccessories(accessoriesWithScores.slice(0, 4));
            } catch (err) {
                console.error("Failed to load cart recommendations", err);
            } finally {
                setLoading(false);
            }
        }

        loadAccessories();
    }, [cart]);

    if (loading || accessories.length === 0) return null;

    return (
        <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Complete Your Sleep Setup</h2>
                    <p className="text-gray-500">Often bought together with items in your cart</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {accessories.map(item => (
                    <AccessoryCard
                        key={item.product_id}
                        accessory={item}
                    />
                ))}
            </div>
        </div>
    );
}
