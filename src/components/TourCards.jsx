"use client";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tours = [
    {
        id: '01',
        day: '26',
        month: 'MAR',
        year: '2026',
        time: '9:00 AM',
        facility: 'PAIX Nairobi',
        duration: '3 HOURS',
        availability: '5 SPOTS LEFT',
        isLimited: false
    },
    {
        id: '02',
        day: '30',
        month: 'APR',
        year: '2026',
        time: '10:00 AM',
        facility: 'IX Africa',
        duration: '3.5 HOURS',
        availability: '12 SPOTS LEFT',
        isLimited: false
    },
    {
        id: '03',
        day: '28',
        month: 'MAY',
        year: '2026',
        time: '9:00 AM',
        facility: 'iColo',
        duration: '2.5 HOURS',
        availability: '2 SPOTS LEFT',
        isLimited: true
    },
    {
        id: '04',
        day: '25',
        month: 'JUN',
        year: '2026',
        time: '2:00 PM',
        facility: 'ADC',
        duration: '2 HOURS',
        availability: '8 SPOTS LEFT',
        isLimited: false
    }
];

export default function TourCards() {
    const router = useRouter();

    const handleBookTour = (tour) => {
        const params = new URLSearchParams({
            ticket: 'individual',
            amount: '2600',
            quantity: '1'
        });
        router.push(`/checkout?${params.toString()}`);
    };

    return (
        <section id="tours" className="pt-16 pb-24 bg-white">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="mb-12">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-crimson mb-2 block">
                        Infrastructure Access
                    </span>
                    <h2 className="text-3xl font-bold text-ink tracking-tight uppercase">
                        Book a Data Center Hangout Tour
                    </h2>
                    <p className="mt-4 text-[15px] font-medium text-ink/60 max-w-2xl leading-relaxed">
                        Tour Africa's most advanced data center infrastructure. See where digital economies are built — and discover how to own a piece of it.
                    </p>
                </div>

                {/* Desktop Table View (Hidden on mobile) */}
                <div className="hidden lg:block overflow-x-auto overflow-y-hidden">
                    <div className="min-w-[1200px] border border-gray-100 rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white">
                        {/* Table Header */}
                        <div className="bg-ink text-white flex items-center px-12 py-6 text-[10px] font-bold uppercase tracking-[0.15em]">
                            <div className="w-[25%]">Session / Time</div>
                            <div className="w-[40%]">Data Center Facility</div>
                            <div className="w-[15%]">Availability</div>
                            <div className="w-[20%] text-right pr-16">Action</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-100">
                            {tours.map((tour, i) => (
                                <motion.div
                                    key={tour.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="flex items-center px-12 py-12 hover:bg-gray-50/50 transition-all duration-300 group"
                                >
                                    {/* Column 1: Date/Time */}
                                    <div className="w-[25%]">
                                        <div className="text-xl font-bold text-ink tracking-tight">{tour.day} {tour.month}</div>
                                    </div>

                                    {/* Column 2: Facility */}
                                    <div className="w-[40%] pr-10">
                                        <div className="text-[17px] font-bold text-ink group-hover:text-crimson transition-colors leading-tight">
                                            {tour.facility}
                                        </div>
                                    </div>

                                    {/* Column 3: Availability */}
                                    <div className="w-[15%]">
                                        <div className={`text-[13px] font-bold tracking-tight ${tour.isLimited ? 'text-crimson' : 'text-ink'}`}>
                                            {tour.availability}
                                        </div>
                                    </div>

                                    {/* Column 4: Action */}
                                    <div className="w-[20%] text-right pr-16">
                                        <button
                                            onClick={() => handleBookTour(tour)}
                                            className="relative overflow-hidden bg-crimson text-white text-[10px] font-bold uppercase tracking-[0.1em] px-10 py-5 rounded hover:bg-crimson-light transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xl shadow-crimson/10 hover:translate-x-1"
                                        >
                                            <div className="absolute inset-0 bg-brand-stripes opacity-30" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                Book tour <ArrowRight size={14} />
                                            </span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile View (Stacked Cards) */}
                <div className="lg:hidden space-y-6">
                    {tours.map((tour, i) => (
                        <motion.div
                            key={`mobile-${tour.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="p-6">
                                {/* Mobile Header: Date & Status */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-2xl font-bold text-ink tracking-tight">{tour.day} {tour.month}</div>
                                    </div>
                                    <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded ${tour.isLimited ? 'bg-crimson/5 text-crimson' : 'bg-gray-50 text-ink'}`}>
                                        {tour.availability}
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-crimson block mb-1">Data Center Facility</span>
                                        <div className="text-[18px] font-bold text-ink leading-tight">{tour.facility}</div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleBookTour(tour)}
                                    className="w-full relative overflow-hidden bg-crimson text-white text-[11px] font-bold uppercase tracking-[0.15em] py-5 rounded flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-xl shadow-crimson/10"
                                >
                                    <div className="absolute inset-0 bg-brand-stripes opacity-20" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Book tour <ArrowRight size={16} />
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-[9px] text-mid/40 mt-12 font-bold uppercase tracking-[0.3em]">
                    All infrastructure tours are regulated under strict security NDA policies.
                </p>
            </div>
        </section>
    );
}
