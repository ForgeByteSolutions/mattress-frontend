import { useState } from "react";
import OrderStepper from "./OrderStepper";
import CustomerDetailsForm from "./CustomerDetailsForm";
import { useCart } from "../../contexts/CartContext";

export default function OrderFlowModal({ onClose }) {
    const { cart, totalPrice } = useCart();
    const [step, setStep] = useState(0);

    const [customerData, setCustomerData] = useState({
        name: "Aiman Zulkifli",
        phone: "+60 12-345 6789",
        email: "aiman.zulkifli@gmail.com",
        address: "No. 24, Jalan Bukit Bintang, 55100 Kuala Lumpur, Malaysia",
    });


    function updateCustomerField(field, value) {
        setCustomerData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function nextStep() {
        // ✅ Validate ONLY customer details step
        if (step === 0) {
            if (
                !customerData.name ||
                !customerData.phone ||
                !customerData.address
            ) {
                alert("Please fill all required customer details");
                return;
            }
        }

        if (step < 5) {
            setStep(step + 1);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 flex gap-6">

                {/* LEFT – STEPPER */}
                <div className="w-1/3">
                    <OrderStepper currentStep={step} />
                </div>

                {/* RIGHT – STEP CONTENT */}
                <div className="w-2/3 flex flex-col justify-between">
                    <div>
                        {step === 0 && (
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Customer Details
                                    </h3>
                                    <CustomerDetailsForm
                                        data={customerData}
                                        onChange={updateCustomerField}
                                    />
                                </div>
                                <div className="w-1/3 bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-3 border-b pb-2">Order Summary</h4>
                                    <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
                                        {cart.map(item => (
                                            <div key={item.product_id} className="text-sm flex justify-between">
                                                <span>{item.model_name} x{item.quantity}</span>
                                                <span>${((item.price?.min || 0) * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-2 font-bold flex justify-between text-blue-600">
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">Payment</h3>
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
                                    <p className="text-blue-800 text-sm mb-1">Total Amount to Pay</p>
                                    <p className="text-3xl font-bold text-blue-600">${totalPrice.toFixed(2)}</p>
                                </div>
                                <p className="text-gray-600">
                                    💳 Secure payment gateway will be integrated here
                                </p>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">
                                    Order Placed & Inventory Check
                                </h3>
                                <p>📦 Verifying stock and confirming your order…</p>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">
                                    Order Dispatched
                                </h3>
                                <p>🚚 Your order has been dispatched from warehouse</p>
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">
                                    Tracking & Updates
                                </h3>
                                <p>📍 Tracking link shared via SMS / WhatsApp</p>
                            </>
                        )}

                        {step === 5 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">
                                    Delivery Completed
                                </h3>
                                <p className="text-green-600 font-semibold">
                                    🎉 Your mattress has been delivered successfully!
                                </p>
                            </>
                        )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="pt-6 flex justify-end gap-3">
                        {/* Cancel button */}
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>

                        {step < 5 ? (
                            <button
                                onClick={nextStep}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
