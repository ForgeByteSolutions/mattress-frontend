import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { explainProduct } from "../../services/explain.service";
import { useCart } from "../../contexts/CartContext";
import ExplainModal from "./ExplainModal";

export default function ProductActions({ product, compact = false }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState([]);
  const [showExplainModal, setShowExplainModal] = useState(false);

  async function handleExplain() {
    setLoading(true);
    setExplanation([]);
    setShowExplainModal(true);

    try {
      const res = await explainProduct(product);

      const parsedExplanation = res.explanation
        .split("\n")
        .map((line) => line.replace(/^-\s*/, "").trim())
        .filter((line) => line.length > 0);

      setExplanation(parsedExplanation);
    } catch (err) {
      console.error(err);
      setExplanation(["Unable to explain this product right now 😕"]);
    } finally {
      setLoading(false);
    }
  }

  function handleBuyNow() {
    addToCart(product);
    navigate("/checkout");
  }

  function handleAddToCart() {
    addToCart(product);
    // Maybe show a toast or navigation to cart later
    alert(`${product.model_name} added to cart!`);
  }

  // Styles based on compact mode
  const btnBase = "transition rounded-lg font-medium";
  const btnBuy = `bg-blue-600 text-white hover:bg-blue-700 ${compact ? 'px-3 py-1.5 text-xs' : 'px-6 py-3'}`;
  const btnCart = `border border-blue-600 text-blue-600 hover:bg-blue-50 ${compact ? 'px-3 py-1.5 text-xs' : 'px-6 py-3'}`;
  const btnExplain = `bg-blue-100 text-blue-700 hover:bg-blue-200 ${compact ? 'px-3 py-1.5 text-xs' : 'px-6 py-3'}`;

  return (
    <div className="">
      {/* 👇 RELATIVE CONTAINER IS CRITICAL */}
      <div className={`flex flex-wrap items-center ${compact ? 'gap-2' : 'gap-4'} relative`}>
        <button
          onClick={handleBuyNow}
          className={`${btnBase} ${btnBuy}`}
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          className={`${btnBase} ${btnCart}`}
        >
          Add to Cart
        </button>

        <button
          onClick={handleExplain}
          className={`${btnBase} ${btnExplain}`}
        >
          Explain with AI
        </button>

        {/* 👇 Explain modal opens BESIDE the button */}
        {showExplainModal && (
          <ExplainModal
            explanation={explanation}
            loading={loading}
            onClose={() => setShowExplainModal(false)}
          />
        )}
      </div>
    </div>
  );
}
