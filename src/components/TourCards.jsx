import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, UserCircle2, Info } from 'lucide-react';

const tours = [
    {
        date: '14 March 2026',
        facility: 'IX Africa NBO1',
        focus: 'Investor Focus',
        description: 'Walk the raised floor of East Africa\'s premier carrier-neutral facility. Meet IX Africa leadership.',
        capacity: '120 Racks Available',
        status: 'Open',
        icon: <UserCircle2 size={16} />
    },
    {
        date: '28 March 2026',
        facility: 'iColo NBO2',
        focus: 'SME Colocation',
        description: 'Purpose-built for SME workloads. See micro-colocation bays and discuss migration timelines.',
        capacity: '85 Racks Available',
        status: 'Open',
        icon: <Info size={16} />
    },
    {
        date: '10 April 2026',
        facility: 'IX Africa NBO1',
        focus: 'Investor Focus',
        description: 'Deep-dive into tokenized DC asset models. CMA sandbox briefing and white-space review.',
        capacity: '120 Racks Available',
        status: 'Open',
        icon: <UserCircle2 size={16} />
    },
    {
        date: '22 April 2026',
        facility: 'ADC NBO1',
        focus: 'Enterprise Only',
        description: 'Tour ADC\'s hyperscale-ready facility. Enterprise-grade redundancy and connectivity review.',
        capacity: 'Strict Limit',
        status: 'Waitlist',
        icon: <Calendar size={16} />
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
        <section id="tours" className="py-32 bg-gray-50/50 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-crimson mb-4 block"
                        >
                            Access Window
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-7xl font-black text-ink mt-3 tracking-tighter leading-none"
                        >
                            Choose Your <br />
                            <span className="text-crimson italic">Facility & Date.</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-xs text-mid text-sm font-bold uppercase tracking-widest leading-loose"
                    >
                        Each tour is a curated, small-group experience. Slots fill fast — reserve to secure your preferred date.
                    </motion.p>
                </div>

                {/* Tour Grid - Offset Layout */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {tours.map((tour, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`group relative bg-white border border-gray-100 p-12 transition-all duration-700 hover:shadow-2xl hover:shadow-crimson/5 ${i % 2 !== 0 ? 'md:mt-12' : ''}`}
                        >
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-crimson scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />

                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center bg-gray-50 border border-transparent group-hover:bg-crimson group-hover:text-white transition-all rounded-sm">
                                        {tour.icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink">{tour.focus}</span>
                                </div>
                                <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 ${tour.status === 'Open' ? 'bg-ink text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    {tour.status}
                                </div>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black text-ink mb-2 tracking-tighter group-hover:text-crimson transition-colors">{tour.date}</h3>
                            <div className="flex items-center gap-2 text-mid font-bold text-[10px] uppercase tracking-[0.25em] mb-10">
                                <MapPin size={12} className="text-crimson" />
                                {tour.facility}
                            </div>

                            <p className="text-mid font-medium leading-relaxed mb-12 text-base">{tour.description}</p>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted">{tour.capacity}</span>
                                </div>
                                <button
                                    onClick={() => handleSelectTour(`${tour.date} — ${tour.facility}`)}
                                    className="w-full sm:w-auto px-8 py-5 bg-ink text-white text-[10px] font-black uppercase tracking-[0.25em] hover:bg-crimson transition-all flex items-center justify-center gap-2"
                                >
                                    Confirm Choice <ChevronRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
