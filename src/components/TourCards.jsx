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
    const handleSelectTour = (tour) => {
        const bookSection = document.getElementById('book');
        if (bookSection) {
            window.dispatchEvent(new CustomEvent('selectTour', {
                detail: `${tour.day} ${tour.monthYear.split(' ')[0]} — ${tour.facility}`
            }));
            bookSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="tours" className="py-24 bg-[#F9F9F7] relative border-y border-gray-100/50">
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
                        className="text-mid/60 font-serif italic text-lg"
                    >
                        4 tours · March — April 2026
                    </motion.div>
                </div>

                {/* List Container */}
                <div className="border-t border-gray-200">
                    {tours.map((tour, i) => (
                        <motion.div
                            key={tour.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative flex flex-col md:flex-row items-center justify-between border-b border-gray-200 py-10 transition-colors hover:bg-white/50"
                        >
                            {/* Active Indicator Line (Shown for id 03 in screenshot, let's make it interactive or static for demo) */}
                            {tour.id === '03' && (
                                <div className="absolute left-0 top-6 bottom-6 w-1 bg-crimson" />
                            )}

                            {/* Column 1: Index */}
                            <div className="hidden lg:block w-20 text-[10px] font-black text-mid/30">
                                {tour.id}
                            </div>

                            {/* Column 2: Date */}
                            <div className="flex items-center gap-6 w-full md:w-48 mb-6 md:mb-0">
                                <span className="text-5xl md:text-6xl font-black text-ink tracking-tighter">
                                    {tour.day}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-mid/80">{tour.monthYear}</span>
                                    <span className="text-[10px] font-black text-mid/40">— {tour.time}</span>
                                </div>
                            </div>

                            {/* Column 3: Facility Info */}
                            <div className="w-full md:w-auto flex-1 mb-8 md:mb-0 md:px-12">
                                <h3 className="text-lg md:text-xl font-black text-ink mb-1">
                                    {tour.facility}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 text-[9px] font-black tracking-widest text-mid/50 uppercase">
                                    <span>{tour.location}</span>
                                    <span>·</span>
                                    <span>{tour.duration}</span>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${tour.spotsLeft <= 2 ? 'bg-orange-500' : 'bg-green-500'}`} />
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${tour.spotsLeft <= 2 ? 'text-orange-600' : 'text-green-600'}`}>
                                        {tour.statusLabel || tour.status}
                                    </span>
                                </div>
                            </div>

                            {/* Column 4: Focus & Availability */}
                            <div className="w-full md:w-64 mb-8 md:mb-0 md:px-6">
                                <div className="bg-gray-100 px-3 py-1.5 mb-4 inline-block">
                                    <span className="text-[9px] font-black tracking-widest text-mid/60 uppercase">
                                        {tour.focus}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-[2px] w-full bg-gray-100 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(tour.spotsLeft / tour.totalSpots) * 100}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className="h-full bg-crimson"
                                        />
                                    </div>
                                    <span className="text-[9px] font-serif italic text-mid/50">
                                        {tour.spotsLeft} spots left
                                    </span>
                                </div>
                            </div>

                            {/* Column 5: Action */}
                            <div className="w-full md:w-auto flex items-center gap-4">
                                <button
                                    onClick={() => handleSelectTour(tour)}
                                    className="flex-1 md:flex-none px-6 py-4 bg-ink text-white text-[10px] font-black uppercase tracking-widest hover:bg-crimson transition-all flex items-center justify-between gap-6 min-w-[180px]"
                                >
                                    Reserve Spot <ArrowRight size={14} />
                                </button>
                                <button className="p-4 border border-gray-100 text-mid/40 hover:text-crimson hover:border-crimson transition-all">
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
