import { motion } from 'framer-motion';
import { Share2, ArrowRight } from 'lucide-react';

const tours = [
    {
        id: '01',
        day: '14',
        monthYear: 'MAR 2026',
        time: '9 AM',
        facility: 'IX Africa — NBO1 Campus',
        location: 'KAREN, NAIROBI',
        duration: '3-HOUR SESSION',
        status: 'OPEN',
        focus: 'INVESTOR FOCUS',
        spotsLeft: 7,
        totalSpots: 20,
    },
    {
        id: '02',
        day: '28',
        monthYear: 'MAR 2026',
        time: '10 AM',
        facility: 'iColo — NBO2 Campus',
        location: 'WESTLANDS, NAIROBI',
        duration: '2.5-HOUR SESSION',
        status: 'LIMITED',
        statusLabel: '2 SPOTS LEFT',
        focus: 'SME COLOCATION',
        spotsLeft: 2,
        totalSpots: 20,
    },
    {
        id: '03',
        day: '10',
        monthYear: 'APR 2026',
        time: '9 AM',
        facility: 'IX Africa — NBO1 Campus',
        location: 'KAREN, NAIROBI',
        duration: '3-HOUR SESSION',
        status: 'OPEN',
        focus: 'INVESTOR FOCUS',
        spotsLeft: 10,
        totalSpots: 20,
    },
    {
        id: '04',
        day: '22',
        monthYear: 'APR 2026',
        time: '2 PM',
        facility: 'ADC — NBO1 Campus',
        location: 'SAMEER PARK, NAIROBI',
        duration: '2-HOUR SESSION',
        status: 'OPEN',
        focus: 'ENTERPRISE ONLY',
        spotsLeft: 5,
        totalSpots: 15,
    }
];

export default function TourCards() {
    const handleBookTour = (tour) => {
        // Redirection logic for checkout
        console.log(`Booking tour: ${tour.facility}`);
        window.location.href = '/checkout';
    };

    return (
        <section id="tours" className="py-24 bg-white relative border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-crimson mb-4 block"
                        >
                            Scheduled Sessions
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-8xl font-black text-ink tracking-tight"
                        >
                            Upcoming Tours
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-mid/60 italic text-lg"
                    >
                        4 tours · March — April 2026
                    </motion.div>
                </div>

                {/* List Container */}
                <div className="border-t border-gray-200">
                    {tours.map((tour, i) => (
                        <motion.div
                            key={tour.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                            className="group relative flex flex-col md:flex-row items-center justify-between border-b border-gray-200 py-10 px-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
                        >
                            {/* Active/Hover Indicator Line */}
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: "70%" }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-crimson transition-opacity duration-300 ${tour.id === '03' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            />

                            {/* Column 1: Index */}
                            <div className="hidden lg:block w-20 text-[10px] font-black transition-colors duration-500 text-mid/30 group-hover:text-crimson/40">
                                {tour.id}
                            </div>

                            {/* Column 2: Date */}
                            <div className="flex items-center gap-6 w-full md:w-48 mb-6 md:mb-0">
                                <span className="text-5xl md:text-6xl font-black text-ink tracking-tighter group-hover:text-crimson transition-colors duration-500">
                                    {tour.day}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-mid/80">{tour.monthYear}</span>
                                    <span className="text-[10px] font-black text-mid/40">— {tour.time}</span>
                                </div>
                            </div>

                            {/* Column 3: Facility Info */}
                            <div className="w-full md:w-auto flex-1 mb-8 md:mb-0 md:px-12">
                                <motion.h3
                                    whileInView={{ letterSpacing: ["-0.02em", "0em"] }}
                                    className="text-lg md:text-xl font-black text-ink mb-1 transition-colors group-hover:text-crimson"
                                >
                                    {tour.facility}
                                </motion.h3>
                                <div className="flex flex-wrap items-center gap-2 text-[9px] font-black tracking-widest text-mid/50 uppercase">
                                    <span>{tour.location}</span>
                                    <span>·</span>
                                    <span>{tour.duration}</span>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${tour.spotsLeft <= 2 ? 'bg-orange-500' : 'bg-green-500'} ${tour.spotsLeft <= 2 ? 'animate-pulse' : ''}`} />
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${tour.spotsLeft <= 2 ? 'text-orange-600' : 'text-green-600'}`}>
                                        {tour.statusLabel || tour.status}
                                    </span>
                                </div>
                            </div>

                            {/* Column 4: Focus & Availability */}
                            <div className="w-full md:w-64 mb-8 md:mb-0 md:px-6">
                                <div className="bg-gray-100 px-3 py-1.5 mb-4 inline-block transition-colors group-hover:bg-gray-200">
                                    <span className="text-[9px] font-black tracking-widest text-mid/60 uppercase">
                                        {tour.focus}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-[2px] w-full bg-gray-100 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(tour.spotsLeft / tour.totalSpots) * 100}%` }}
                                            transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                                            whileHover={{ opacity: 0.8 }}
                                            className="h-full bg-crimson"
                                        />
                                    </div>
                                    <span className="text-[9px] italic text-mid/50 group-hover:text-mid transition-colors">
                                        {tour.spotsLeft} spots left
                                    </span>
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex items-center gap-4">
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleBookTour(tour)}
                                    className="flex-1 md:flex-none px-6 py-4 bg-crimson text-white text-[10px] font-black uppercase tracking-widest hover:bg-crimson-light transition-all flex items-center justify-between gap-6 min-w-[140px] shadow-lg shadow-crimson/10"
                                >
                                    Book tour <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
