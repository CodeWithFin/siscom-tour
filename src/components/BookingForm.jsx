import { useState, useEffect } from 'react';

const tourDates = [
    '14 March 2026 — IX Africa NBO1 (Investor Focus)',
    '28 March 2026 — iColo NBO2 (SME Colocation)',
    '10 April 2026 — IX Africa NBO1 (Investor Focus)',
    '22 April 2026 — Africa Data Centers [Waitlist Only]',
];

const roles = [
    'Investor / Fund Manager',
    'Business Owner / SME',
    'ISP / Telecoms',
    'Enterprise IT',
    'Developer / Tech Lead',
    'Board / Executive',
    'Other',
];

const interests = [
    'Investing in DC White Space',
    'Colocation for my business',
    'Tokenized DC Assets',
    'AI / GPU Compute',
    'Connectivity / Fibre',
    'Just exploring',
];

export default function BookingForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        tourDate: '',
        interests: [],
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    // Listen for tour selection from TourCards
    useEffect(() => {
        const handleSelectTour = (e) => {
            const selectedDate = e.detail;
            const matchingDate = tourDates.find(
                (d) => d.includes(selectedDate.split(' — ')[0])
            );
            if (matchingDate) {
                setFormData((prev) => ({ ...prev, tourDate: matchingDate }));
            }
        };
        window.addEventListener('selectTour', handleSelectTour);
        return () => window.removeEventListener('selectTour', handleSelectTour);
    }, []);

    const toggleInterest = (interest) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section id="book" className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
                        Reserve Your Spot
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-ink mt-3">
                        Book Your Tour
                    </h2>
                    <p className="max-w-lg mx-auto text-mid mt-4 text-lg">
                        Small groups only. Fill in the form below and we&apos;ll confirm
                        your access within 24 hours.
                    </p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Row: Name */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Your first name"
                                    required
                                    className="w-full bg-bg2 border border-gray-200 text-ink text-sm px-4 py-3 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Your last name"
                                    required
                                    className="w-full bg-bg2 border border-gray-200 text-ink text-sm px-4 py-3 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Row: Contact */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@company.com"
                                    required
                                    className="w-full bg-bg2 border border-gray-200 text-ink text-sm px-4 py-3 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-2">
                                    Phone (optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+254 7xx xxx xxx"
                                    className="w-full bg-bg2 border border-gray-200 text-ink text-sm px-4 py-3 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Row: Company & Role */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-2">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Your organisation"
                                    required
                                    className="w-full bg-bg2 border border-gray-200 text-ink text-sm px-4 py-3 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-2">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full bg-bg2 border border-gray-200 text-ink text-sm px-4 py-3 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20 transition-colors"
                                >
                                    <option value="">Select role…</option>
                                    {roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Tour Date */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-2">
                                Preferred Tour Date
                            </label>
                            <select
                                name="tourDate"
                                value={formData.tourDate}
                                onChange={handleChange}
                                className="w-full bg-bg2 border border-gray-200 text-ink text-sm px-4 py-3 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20 transition-colors"
                            >
                                <option value="">Choose a date…</option>
                                {tourDates.map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Interests */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-3">
                                I&apos;m interested in (select all that apply)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {interests.map((interest) => (
                                    <button
                                        key={interest}
                                        type="button"
                                        onClick={() => toggleInterest(interest)}
                                        className={`text-xs font-semibold px-4 py-2 border transition-all ${formData.interests.includes(interest)
                                                ? 'bg-crimson text-white border-crimson'
                                                : 'bg-white text-mid border-gray-300 hover:border-crimson/50 hover:text-crimson'
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-ink mb-2">
                                What would you like to see or discuss?
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="e.g. rack pricing, investment minimums, regulatory status, SME migration…"
                                rows={4}
                                className="w-full bg-bg2 border border-gray-200 text-ink text-sm px-4 py-3 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/20 transition-colors resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-crimson text-white font-bold text-sm uppercase tracking-wider py-4 hover:bg-crimson-light transition-all hover:shadow-lg hover:shadow-crimson/20"
                        >
                            Confirm My Spot →
                        </button>

                        <p className="text-center text-xs text-muted">
                            Confirmation sent within 24hrs · NDA may be required on-site · Tours run rain or shine
                        </p>
                    </form>
                ) : (
                    /* Success State */
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-crimson text-4xl font-bold">✓</span>
                        </div>
                        <h3 className="text-3xl font-extrabold text-ink mb-4">You&apos;re Confirmed.</h3>
                        <p className="text-mid text-lg max-w-md mx-auto">
                            We&apos;ll send your access brief and joining instructions shortly.
                            <br />
                            See you on the floor.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
