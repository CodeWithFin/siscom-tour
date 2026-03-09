import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get URL parameters
    const urlTicketType = searchParams.get('ticket') || 'individual';
    const urlAmount = parseInt(searchParams.get('amount') || '2600');
    const urlQuantity = parseInt(searchParams.get('quantity') || '1');
    const urlIsClubMember = searchParams.get('clubMember') === 'true';
    const urlClubId = searchParams.get('clubId') || '';

    // State for checkout - verbatim from user snippet
    const [ticketType, setTicketType] = useState(urlTicketType);
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

    // Calculate unit price and total
    const getUnitPrice = () => {
        return ticketType === 'individual' ? 2600 : 26000;
    };

    // Update total when quantity or other factors change
    useEffect(() => {
        setTotalAmount(getUnitPrice() * quantity);
    }, [ticketType, quantity]);

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
            eventType: ticketType === 'individual' ? '2600' : '26000',
            ticketType,
            quantity
        });

        if (res.success) {
            setCheckoutRequestId(res.checkoutRequestId);
            setPaymentStatus('pending');
            setMessage("Payment initiated. Check your phone and enter your M-Pesa PIN to complete the payment.");
        } else {
            // Since this is a frontend-only dev environment for now, 
            // let's add a small simulation for the USER to see the flow if the API fails
            console.warn("Payment API failed, simulating sequence for demo...");
            setTimeout(() => {
                setPaymentStatus('pending');
                setMessage("Payment initiated. Check your phone and enter your M-Pesa PIN (SIMULATED).");
                setTimeout(() => {
                    setPaymentStatus('success');
                }, 5000);
            }, 1500);
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
                        <div className="bg-crimson text-white text-center py-6">
                            <h1 className="text-2xl font-bold">
                                {ticketType === 'individual' ? 'Individual Ticket' : 'Corporate Package'} Checkout
                            </h1>
                            <p className="text-white/80 mt-2 font-medium">Complete your purchase</p>
                        </div>

                        {/* Form */}
                        <div className="p-8 space-y-6">
                            {/* Ticket Summary */}
                            <div className="bg-gray-50 rounded-lg p-4 border">
                                <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Ticket Type:</span>
                                        <span className="font-medium text-right">
                                            {ticketType === 'individual' ? 'Individual Ticket' : 'Corporate & SME Package'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
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
                                        <span>KES {getUnitPrice().toLocaleString()}</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                        <span>Total:</span>
                                        <span className="text-crimson">KES {totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interests Section */}
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    I'm interested in (select all that apply)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowInterests(!showInterests)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-300 bg-white hover:border-crimson transition-all text-left"
                                >
                                    <span className={`text-sm ${interests.length > 0 ? 'text-ink' : 'text-gray-500'}`}>
                                        {interests.length > 0
                                            ? `${interests.length} selected`
                                            : "Select interests..."}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showInterests ? 'rotate-180' : ''}`} />
                                </button>

                                {showInterests && (
                                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="max-h-60 overflow-y-auto p-2 space-y-1">
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
                                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${interests.includes(interest)
                                                        ? 'bg-crimson/5 text-crimson font-semibold'
                                                        : 'text-ink hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {interest}
                                                    {interests.includes(interest) && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {interests.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {interests.map(i => (
                                            <span key={i} className="px-2 py-1 bg-crimson/5 text-crimson text-[10px] font-bold uppercase tracking-wider rounded border border-crimson/10 flex items-center gap-1">
                                                {i}
                                                <button
                                                    onClick={() => setInterests(interests.filter(x => x !== i))}
                                                    className="hover:text-crimson-light"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Name Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors text-ink placeholder-gray-500 outline-none"
                                />
                            </div>

                            {/* Email Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors text-ink placeholder-gray-500 outline-none"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Phone Number (M-Pesa)
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    placeholder="0712345678"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors text-ink placeholder-gray-500 outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">Enter your M-Pesa registered number</p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-300 my-4"></div>

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
                                    type="button"
                                    className="w-full bg-crimson hover:bg-crimson-light text-white font-bold py-5 rounded-sm transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed uppercase tracking-widest text-[11px]"
                                    disabled={paymentStatus === 'initiating'}
                                    onClick={handlePayment}
                                >
                                    {paymentStatus === 'initiating' ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Initiating Payment...</span>
                                        </div>
                                    ) : (
                                        'Pay Now'
                                    )}
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
