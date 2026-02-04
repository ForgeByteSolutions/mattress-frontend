import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import CartAccessories from "../components/product/CartAccessories";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">Look like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/products"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="bg-white border rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-sm"
                                >
                                    <div className="w-full sm:w-40 h-40 bg-gray-50">
                                        <img
                                            src={item.image_urls?.[0] || "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=200"}
                                            alt={item.model_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{item.model_name}</h3>
                                                <p className="text-gray-500 text-sm">{item.mattress_type}</p>
                                            </div>
                                            <p className="text-lg font-bold text-blue-600">
                                                {item.price?.currency} {(item.price?.min * item.quantity).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product_id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 transition"
                                                >
                                                    -
                                                </button>
                                                <span className="w-4 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product_id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 transition"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product_id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                                            >
                                                Remove Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="text-gray-500 hover:text-gray-700 text-sm underline"
                            >
                                Clear entire cart
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-24">
                                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{cart[0]?.price?.currency} {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="border-t pt-4 flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-blue-600">{cart[0]?.price?.currency} {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="block w-full text-center px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold text-lg shadow-lg shadow-blue-100"
                                >
                                    Proceed to Checkout
                                </Link>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    Secure checkout powered by SleepTantrum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <CartAccessories cart={cart} />
                    </div>
                </>
            )}
        </div >
    );
}
