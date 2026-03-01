import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import OrderStepper from "../components/order/OrderStepper";
import CustomerDetailsForm from "../components/order/CustomerDetailsForm";

export default function Checkout() {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const [customerData, setCustomerData] = useState({
        name: "Jon Snow",
        phone: "+1 415-555-0199",
        email: "northremembers@winterfell.com",
        address: "Lord Commander’s Quarters, The Wall, Castle Black, The North, Westeros",
    });

    function updateCustomerField(field, value) {
        setCustomerData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function nextStep() {
        if (step === 0) {
            if (!customerData.name || !customerData.phone || !customerData.address) {
                alert("Please fill all required customer details");
                return;
            }
        }

        if (step < 5) {
            setStep(step + 1);
        }
    }

    if (cart.length === 0 && step < 2) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate("/products")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Go to Products
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-10">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Stepper Side */}
                <div className="w-full lg:w-1/4">
                    <div className="bg-white border rounded-2xl p-6 sticky top-24 shadow-sm">
                        <OrderStepper currentStep={step} />
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="bg-white border rounded-2xl p-8 shadow-sm min-h-[400px]">
                        {step === 0 && (
                            <div className="flex flex-col md:flex-row gap-10">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-6">Customer Details</h3>
                                    <CustomerDetailsForm
                                        data={customerData}
                                        onChange={updateCustomerField}
                                    />
                                </div>
                                <div className="w-full md:w-80 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <h4 className="font-bold mb-4 pb-2 border-b">Order Summary</h4>
                                    <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                                        {cart.map(item => (
                                            <div key={item.product_id} className="text-sm flex justify-between gap-4">
                                                <span className="text-gray-600 truncate">{item.model_name} x{item.quantity}</span>
                                                <span className="font-semibold whitespace-nowrap">
                                                    {item.price?.currency} {((item.price?.min || 0) * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-4 flex justify-between font-bold text-lg text-blue-600">
                                        <span>Total</span>
                                        <span>{cart[0]?.price?.currency} {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="max-w-md mx-auto py-10">
                                <h3 className="text-xl font-bold mb-6">Payment Method</h3>
                                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mb-8 text-center">
                                    <p className="text-blue-800 text-sm mb-2 uppercase tracking-wide font-semibold">Total Amount to Pay</p>
                                    <p className="text-4xl font-black text-blue-600">
                                        {cart[0]?.price?.currency} {totalPrice.toLocaleString()}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <button className="w-full p-4 border-2 border-blue-600 rounded-xl flex items-center gap-4 bg-blue-50">
                                        <div className="w-4 h-4 rounded-full border-4 border-blue-600"></div>
                                        <span className="font-bold">Credit / Debit Card</span>
                                        <div className="ml-auto flex gap-2">
                                            <span className="text-2xl">💳</span>
                                        </div>
                                    </button>
                                    <button disabled className="w-full p-4 border rounded-xl flex items-center gap-4 opacity-50 grayscale cursor-not-allowed">
                                        <div className="w-4 h-4 rounded-full border"></div>
                                        <span className="font-medium">Direct Bank Transfer</span>
                                    </button>
                                </div>
                                <p className="text-gray-400 text-xs text-center mt-8">
                                    By clicking Continue, you agree to our Terms of Service.
                                </p>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-6">✅</div>
                                <h3 className="text-3xl font-black text-blue-600 mb-4">Order Placed!</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mb-10">
                                    Your order has been successfully placed. We've sent a confirmation to your email.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => {
                                            clearCart();
                                            navigate("/track/STR-99283-MX");
                                        }}
                                        className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition"
                                    >
                                        Track My Order 📍
                                    </button>
                                    <button
                                        onClick={() => {
                                            clearCart();
                                            navigate("/");
                                        }}
                                        className="px-10 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
                                    >
                                        Return Home
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {step < 2 && (
                        <div className="flex justify-between items-center px-4">
                            <button
                                onClick={() => navigate("/cart")}
                                className="text-gray-500 hover:text-gray-700 font-medium"
                            >
                                ← Back to Cart
                            </button>
                            <button
                                onClick={nextStep}
                                className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition"
                            >
                                Continue To Next Step
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
