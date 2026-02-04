import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import OrderFlowModal from "../order/OrderFlowModal";

export default function CartModal({ onClose }) {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const [showOrderFlow, setShowOrderFlow] = useState(false);

    if (showOrderFlow) {
        return <OrderFlowModal onClose={onClose} />;
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 flex flex-col max-h-[80vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                        &times;
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-10">
                        <p className="text-gray-500 text-lg mb-4">Your cart is empty 😴</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {cart.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg"
                                >
                                    <img
                                        src={item.image_urls?.[0] || "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=200"}
                                        alt={item.model_name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{item.model_name}</h3>
                                        <p className="text-blue-600 font-medium">{item.price?.currency} {item.price?.min}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.product_id, -1)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <span className="w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product_id, 1)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.product_id)}
                                        className="text-red-500 hover:text-red-700 px-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4 text-xl font-bold">
                                <span>Total</span>
                                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={clearCart}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Clear Cart
                                </button>
                                <button
                                    onClick={() => setShowOrderFlow(true)}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
