"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import Navbar from './Navbar';

// Types and helper functions from the user's requested design pattern
async function initiateMpesaPayment({ email, phoneNumber, amount, eventType, isClubMember, ticketType, quantity }) {
    try {
        const res = await fetch("/api/mpesa/initiate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, phoneNumber, amount, eventType, isClubMember, ticketType, quantity }),
        });
        return await res.json();
    } catch (e) {
        return { error: "Failed to initiate payment" };
    }
}

async function checkPaymentStatus(checkoutRequestId) {
    try {
        const res = await fetch(`/api/mpesa/status?checkoutRequestId=${checkoutRequestId}`);
        return await res.json();
    } catch (e) {
        return { status: 'pending' };
    }
}

export default function Checkout() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Get URL parameters
    const urlTicketType = searchParams.get('ticket') || 'individual';
    const urlAmount = parseInt(searchParams.get('amount') || '2600');
    const urlQuantity = parseInt(searchParams.get('quantity') || '1');
    const urlIsClubMember = searchParams.get('clubMember') === 'true';
    const urlClubId = searchParams.get('clubId') || '';
    const urlFacility = searchParams.get('facility') || '';
    const urlDay = searchParams.get('day') || '';
    const urlMonth = searchParams.get('month') || '';

    // State for checkout - verbatim from user snippet
    const [quantity, setQuantity] = useState(urlQuantity);
    const [totalAmount, setTotalAmount] = useState(urlAmount);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [interests, setInterests] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState('idle');
    const [message, setMessage] = useState("");
    const [checkoutRequestId, setCheckoutRequestId] = useState("");
    const [paymentDetails, setPaymentDetails] = useState({});
    const [showInterests, setShowInterests] = useState(false);
    const dropdownRef = useRef(null);

    // Update total when quantity changes
    useEffect(() => {
        setTotalAmount(2600 * quantity);
    }, [quantity]);

    // Poll payment status - verbatim from user snippet
    useEffect(() => {
        if (paymentStatus === 'pending' && checkoutRequestId) {
            const pollInterval = setInterval(async () => {
                const statusRes = await checkPaymentStatus(checkoutRequestId);

                if (statusRes.status === 'success') {
                    setPaymentStatus('success');
                    clearInterval(pollInterval);
                } else if (statusRes.status === 'failed') {
                    setPaymentStatus('failed');
                    setMessage('Payment failed. Please try again.');
                    clearInterval(pollInterval);
                }
            }, 3000); // Poll every 3 seconds

            // Timeout after 5 minutes
            const timeout = setTimeout(() => {
                clearInterval(pollInterval);
                if (paymentStatus === 'pending') {
                    setPaymentStatus('failed');
                    setMessage('Payment timeout. Please try again.');
                }
            }, 5 * 60 * 1000);

            return () => {
                clearInterval(pollInterval);
                clearTimeout(timeout);
            };
        }
    }, [paymentStatus, checkoutRequestId]);
    // Handle click outside dropdown to close it
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowInterests(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handlePayment = async () => {
        setPaymentStatus('initiating');
        setMessage("");

        if (!name || !email || !phoneNumber || totalAmount <= 0) {
            setMessage("Please fill in all required fields (Name, Email, Phone)");
            setPaymentStatus('idle');
            return;
        }

        // Try real API call first
        const res = await initiateMpesaPayment({
            email,
            phoneNumber,
            name,
            interests,
            amount: totalAmount,
            eventType: '2600',
            ticketType: 'individual',
            quantity
        });

        if (res.success) {
            setCheckoutRequestId(res.checkoutRequestId);
            setPaymentStatus('pending');
            setMessage("Payment initiated. Check your phone and enter your M-Pesa PIN to complete the payment.");
        } else {
            setPaymentStatus('failed');
            setMessage(res.error || "Failed to initiate payment. Please check your credentials.");
        }
    };

    const resetPayment = () => {
        setPaymentStatus('idle');
        setMessage("");
        setCheckoutRequestId("");
        setPaymentDetails({});
    };

    return (
        <div className="min-h-screen bg-white selection:bg-crimson selection:text-white">
            <Navbar />

            {/* Main Content */}
            <div className="min-h-screen flex items-center justify-center p-4 pt-20">
                <div className="w-full max-w-md">
                    {/* Subscribe Form Card */}
                    <div className="bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="bg-crimson relative overflow-hidden text-white text-center py-5">
                            <div className="absolute inset-0 bg-brand-stripes opacity-30" />
                            <h1 className="relative z-10 text-xl font-bold uppercase tracking-tight">
                                {urlFacility ? `${urlFacility} Tour` : 'DC Tour Checkout'}
                            </h1>
                            <p className="relative z-10 text-white/80 text-[10px] mt-0.5 font-medium tracking-wide">
                                {urlDay} {urlMonth} — Individual Access
                            </p>
                        </div>

                        {/* Form */}
                        <div className="p-5 space-y-3">
                            {/* Ticket Summary */}
                            <div className="bg-gray-50 rounded-lg p-2.5 border">
                                <h3 className="text-[11px] font-bold text-gray-900 mb-1 uppercase tracking-wider">Order Summary</h3>
                                <div className="space-y-0.5 text-[12px]">
                                    {urlFacility && (
                                        <div className="flex justify-between">
                                            <span>Facility:</span>
                                            <span className="font-bold text-ink">{urlFacility}</span>
                                        </div>
                                    )}
                                    {urlDay && (
                                        <div className="flex justify-between">
                                            <span>Date:</span>
                                            <span className="font-bold text-ink">{urlDay} {urlMonth} 2026</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center py-1">
                                        <span>Quantity:</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="h-6 w-6 rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 text-xs font-semibold"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-medium">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="h-6 w-6 rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 text-xs font-semibold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Unit Price:</span>
                                        <span>KES 2,600</span>
                                    </div>
                                    <div className="border-t pt-1 mt-1 flex justify-between font-bold text-sm">
                                        <span>Total:</span>
                                        <span className="text-crimson">KES {totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interests Section */}
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-[11px] font-semibold text-gray-900 mb-1 uppercase tracking-wider">
                                    Interests
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowInterests(!showInterests)}
                                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:border-crimson transition-all text-left"
                                >
                                    <span className={`text-[12px] truncate pr-2 ${interests.length > 0 ? 'text-ink font-medium' : 'text-gray-500'}`}>
                                        {interests.length > 0
                                            ? interests.join(", ")
                                            : "Select..."}
                                    </span>
                                    <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showInterests ? 'rotate-180' : ''}`} />
                                </button>

                                {showInterests && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="max-h-48 overflow-y-auto p-1.5 space-y-0.5">
                                            {[
                                                "Investing in DC White Space",
                                                "Colocation for my business",
                                                "Tokenized DC Assets",
                                                "AI / GPU Compute",
                                                "Connectivity / Fibre",
                                                "Just exploring"
                                            ].map((interest) => (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    onClick={() => {
                                                        if (interests.includes(interest)) {
                                                            setInterests(interests.filter(i => i !== interest));
                                                        } else {
                                                            setInterests([...interests, interest]);
                                                        }
                                                    }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${interests.includes(interest)
                                                        ? 'bg-crimson/5 text-crimson font-semibold'
                                                        : 'text-ink hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {interest}
                                                    {interests.includes(interest) && <Check className="w-3.5 h-3.5" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Info Grid for Name/Email to save space */}
                            <div className="grid grid-cols-1 gap-2.5">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-900 mb-1 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors text-[13px] placeholder-gray-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-900 mb-1 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors text-[13px] placeholder-gray-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-900 mb-1 uppercase tracking-wider">Phone (M-Pesa)</label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        placeholder="0712345678"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors text-[13px] placeholder-gray-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-1"></div>

                            {/* Payment Status and Button */}
                            {paymentStatus === 'success' ? (
                                <div className="space-y-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                        <div className="text-green-600 text-lg font-semibold mb-2">✅ Payment Successful!</div>
                                        <p className="text-green-600 text-sm mt-2">
                                            Your ticket has been confirmed. Check your SMS for details.
                                        </p>
                                    </div>
                                    <button
                                        onClick={resetPayment}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                                    >
                                        Make Another Payment
                                    </button>
                                </div>
                            ) : paymentStatus === 'failed' ? (
                                <div className="space-y-4">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                        <div className="text-red-600 text-lg font-semibold mb-2">❌ Payment Failed</div>
                                        <p className="text-red-700 text-sm">{message}</p>
                                    </div>
                                    <button
                                        onClick={resetPayment}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : paymentStatus === 'pending' ? (
                                <div className="space-y-4">
                                    <div className="bg-crimson/5 border border-crimson/10 rounded-lg p-4 text-center">
                                        <div className="flex items-center justify-center space-x-2 mb-3">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-crimson"></div>
                                            <span className="text-crimson font-semibold">Payment in Progress</span>
                                        </div>
                                        <p className="text-ink text-sm font-medium">{message}</p>
                                        <p className="text-crimson text-xs mt-2">
                                            Please complete the payment on your phone. This page will update automatically.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={handlePayment}
                                    disabled={paymentStatus !== 'idle'}
                                    className="w-full relative overflow-hidden bg-crimson hover:bg-crimson-dark text-white font-bold py-4 px-6 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-crimson/20 flex items-center justify-center gap-3 text-sm"
                                >
                                    <div className="absolute inset-0 bg-brand-stripes opacity-20" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        {paymentStatus === 'initiating' ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Initiating...</span>
                                            </>
                                        ) : (
                                            'Pay Now'
                                        )}
                                    </span>
                                </button>
                            )}

                            {message && paymentStatus === 'idle' && (
                                <div className="mt-4 text-center text-sm text-red-600">{message}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
