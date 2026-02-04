import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import OrderStepper from "../components/order/OrderStepper";

export default function TrackOrder() {
    const { orderId } = useParams();
    const [step, setStep] = useState(2); // Start at "Order Placed"
    const [statusText, setStatusText] = useState("We are verifying your order...");

    useEffect(() => {
        // Simulate progress through delivery steps
        const timers = [
            setTimeout(() => {
                setStep(3);
                setStatusText("Your mattress has been dispatched from our warehouse!");
            }, 5000),
            setTimeout(() => {
                setStep(4);
                setStatusText("Your order is out for delivery. Our team will contact you shortly.");
            }, 12000),
            setTimeout(() => {
                setStep(5);
                setStatusText("Delivery completed! Enjoy your SleepTantrum experience.");
            }, 20000),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Track Your Order</h1>
                    <p className="text-gray-500 mt-1">Order ID: <span className="font-mono font-bold text-blue-600">{orderId || "STR-99283-MX"}</span></p>
                </div>
                <Link to="/" className="text-blue-600 hover:underline font-medium">
                    ← Return to Home
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Status Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white border rounded-2xl p-8 sticky top-24 shadow-sm">
                        <OrderStepper currentStep={step} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-2xl p-10 shadow-sm text-center">
                        <div className="text-6xl mb-6">
                            {step === 2 && "📦"}
                            {step === 3 && "🚚"}
                            {step === 4 && "📍"}
                            {step === 5 && "🎉"}
                        </div>

                        <h2 className="text-2xl font-bold mb-4">
                            {step === 2 && "Order Placed & Verified"}
                            {step === 3 && "Order Dispatched"}
                            {step === 4 && "Out for Delivery"}
                            {step === 5 && "Delivered Successfully"}
                        </h2>

                        <p className="text-gray-600 text-lg max-w-md mx-auto mb-10">
                            {statusText}
                        </p>

                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left">
                            <h3 className="font-bold text-blue-800 mb-2">Estimated Arrival</h3>
                            <p className="text-blue-600 text-sm">
                                {step < 5 ? "Today, by 6:00 PM" : "Delivered at 2:15 PM today"}
                            </p>
                        </div>

                        {step === 5 && (
                            <div className="mt-10 pt-10 border-t border-gray-100 flex flex-col items-center gap-4">
                                <p className="text-sm text-gray-400">How was your delivery experience?</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button key={star} className="text-2xl hover:scale-125 transition">⭐</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
