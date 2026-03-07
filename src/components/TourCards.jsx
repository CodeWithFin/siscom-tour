import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, UserCircle2 } from 'lucide-react';

const tours = [
    {
        date: '14 March 2026',
        facility: 'IX Africa NBO1',
        focus: 'Investor Focus',
        description: 'Walk the raised floor of East Africa\'s premier carrier-neutral facility. Meet IX Africa leadership and review investment-grade infrastructure.',
        capacity: '120 Racks Available',
        status: 'Open',
        icon: <UserCircle2 size={24} className="text-crimson" />
    },
    {
        date: '28 March 2026',
        facility: 'iColo NBO2',
        focus: 'SME Colocation',
        description: 'Purpose-built for SME workloads. See micro-colocation bays, review pricing from $100/1U, and discuss migration timelines.',
        capacity: '85 Racks Available',
        status: 'Open',
        icon: <ChevronRight size={24} className="text-crimson" />
    },
    {
        date: '10 April 2026',
        facility: 'IX Africa NBO1',
        focus: 'Investor Focus',
        description: 'Deep-dive into tokenized DC asset models. CMA sandbox briefing and white-space availability review included.',
        capacity: '120 Racks Available',
        status: 'Open',
        icon: <UserCircle2 size={24} className="text-crimson" />
    },
    {
        date: '22 April 2026',
        facility: 'Africa Data Centers',
        focus: 'Enterprise Only',
        description: 'Tour ADC\'s hyperscale-ready facility. Enterprise-grade redundancy, connectivity review, and SLA walkthrough.',
        capacity: 'Strict Limit',
        status: 'Waitlist',
        icon: <Calendar size={24} className="text-crimson" />
    },
];

export default function TourCards() {
    const handleSelectTour = (tourDate) => {
        const bookSection = document.getElementById('book');
        if (bookSection) {
            window.dispatchEvent(new CustomEvent('selectTour', { detail: tourDate }));
            bookSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="tours" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-crimson mb-4 block"
                    >
                        Upcoming Access
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-ink mt-3 tracking-tighter"
                    >
                        Choose Your Date
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-xl mx-auto text-mid mt-6 text-base md:text-lg lg:text-xl font-medium"
                    >
                        Each tour is a curated, small-group experience. Slots fill fast —
                        reserve your spot to secure your preferred date.
                    </motion.p>
                </div>

                {/* Tour Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {tours.map((tour, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-white border border-gray-100 rounded-sm p-10 hover:border-crimson/50 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />

                            {/* Status Badge */}
                            <div className="flex items-center justify-between mb-10 relative">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-sm group-hover:bg-crimson group-hover:text-white transition-colors duration-300">
                                        {tour.icon}
                                    </div>
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-ink">
                                        {tour.focus}
                                    </span>
                                </div>
                                <span
                                    className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${tour.status === 'Open'
                                            ? 'bg-ink text-white'
                                            : 'bg-amber-100 text-amber-700'
                                        }`}
                                >
                                    {tour.status}
                                </span>
                            </div>

                            {/* Date & Facility */}
                            <h3 className="text-3xl md:text-4xl font-black text-ink mb-2 tracking-tighter group-hover:text-crimson transition-colors">{tour.date}</h3>
                            <div className="flex items-center gap-2 text-mid font-bold text-xs uppercase tracking-widest mb-8">
                                <MapPin size={14} className="text-crimson" />
                                {tour.facility}
                            </div>

                            {/* Description */}
                            <p className="text-mid md:text-base leading-relaxed mb-10 font-medium">{tour.description}</p>

                            {/* Footer */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-8 mt-auto">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                                    <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                                    {tour.capacity}
                                </div>
                                <button
                                    onClick={() => handleSelectTour(`${tour.date} — ${tour.facility}`)}
                                    className="w-full sm:w-auto bg-ink text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 hover:bg-crimson transition-all relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Select Tour <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
