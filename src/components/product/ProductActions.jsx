import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { explainProduct } from "../../services/explain.service";
import { useCart } from "../../contexts/CartContext";
import ExplainModal from "./ExplainModal";

export default function ProductActions({ product }) {
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

  return (
    <div className="flex flex-col gap-4">
      {/* 👇 RELATIVE CONTAINER IS CRITICAL */}
      <div className="flex gap-4 relative">
        <button
          onClick={handleBuyNow}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Add to Cart 🛒
        </button>

        <button
          onClick={handleExplain}
          className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
        >
          Explain with AI 🤖
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
