import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tours = [
    {
        id: '01',
        day: '14',
        month: 'MAR',
        year: '2026',
        time: '9:00 AM',
        facility: 'IX Africa — NBO1 Campus',
        location: 'KAREN, NAIROBI',
        focus: 'INVESTOR FOCUS',
        duration: '3 HOURS',
        availability: '7 SPOTS LEFT',
        isLimited: false
    },
    {
        id: '02',
        day: '28',
        month: 'MAR',
        year: '2026',
        time: '10:00 AM',
        facility: 'iColo — NBO2 Campus',
        location: 'WESTLANDS, NAIROBI',
        focus: 'SME COLOCATION',
        duration: '2.5 HOURS',
        availability: '2 SPOTS LEFT',
        isLimited: true
    },
    {
        id: '03',
        day: '10',
        month: 'APR',
        year: '2026',
        time: '9:00 AM',
        facility: 'IX Africa — NBO1 Campus',
        location: 'KAREN, NAIROBI',
        focus: 'INVESTOR FOCUS',
        duration: '3 HOURS',
        availability: '10 SPOTS LEFT',
        isLimited: false
    },
    {
        id: '04',
        day: '22',
        month: 'APR',
        year: '2026',
        time: '2:00 PM',
        facility: 'ADC — NBO1 Campus',
        location: 'SAMEER PARK, NAIROBI',
        focus: 'ENTERPRISE ONLY',
        duration: '2 HOURS',
        availability: '5 SPOTS LEFT',
        isLimited: false
    }
];

export default function TourCards() {
    const navigate = useNavigate();

    const handleBookTour = (tour) => {
        const isInvestor = tour.focus.includes('INVESTOR');
        const params = new URLSearchParams({
            ticket: isInvestor ? 'individual' : 'corporate',
            amount: isInvestor ? '5000' : '50000',
            quantity: '1'
        });
        navigate(`/checkout?${params.toString()}`);
    };

    return (
        <section id="tours" className="py-24 bg-white">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="mb-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-crimson mb-2 block">
                        Infrastructure Access
                    </span>
                    <h2 className="text-3xl font-black text-ink tracking-tight uppercase">
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
                        <div className="bg-ink text-white flex items-center px-12 py-6 text-[11px] font-black uppercase tracking-[0.25em]">
                            <div className="w-[18%]">Session / Time</div>
                            <div className="w-[25%]">Infrastructure Campus</div>
                            <div className="w-[18%]">Location</div>
                            <div className="w-[14%]">Focus Group</div>
                            <div className="w-[10%]">Availability</div>
                            <div className="w-[15%] text-right pr-16">Action</div>
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
                                    <div className="w-[18%]">
                                        <div className="text-xl font-black text-ink tracking-tight mb-1.5">{tour.day} {tour.month}</div>
                                        <div className="text-[11px] text-ink/65 font-medium uppercase tracking-widest">
                                            {tour.year} · {tour.time}
                                        </div>
                                    </div>

                                    {/* Column 2: Facility */}
                                    <div className="w-[25%] pr-10">
                                        <div className="text-[17px] font-black text-ink group-hover:text-crimson transition-colors mb-1.5">
                                            {tour.facility}
                                        </div>
                                        <div className="text-[11px] text-ink/65 font-semibold uppercase tracking-[0.12em]">
                                            {tour.duration} SECURITY ACCESS
                                        </div>
                                    </div>

                                    {/* Column 3: Location */}
                                    <div className="w-[18%]">
                                        <div className="text-sm font-bold text-ink uppercase tracking-wide">
                                            {tour.location}
                                        </div>
                                    </div>

                                    {/* Column 4: Focus */}
                                    <div className="w-[14%]">
                                        <div className="text-[11px] font-bold text-ink/65 uppercase tracking-wide">
                                            {tour.focus}
                                        </div>
                                    </div>

                                    {/* Column 5: Availability */}
                                    <div className="w-[10%]">
                                        <div className={`text-sm font-black tracking-tight ${tour.isLimited ? 'text-orange-600' : 'text-ink'}`}>
                                            {tour.availability}
                                        </div>
                                    </div>

                                    {/* Column 6: Action */}
                                    <div className="w-[15%] text-right pr-16">
                                        <button
                                            onClick={() => handleBookTour(tour)}
                                            className="bg-crimson text-white text-[10px] font-black uppercase tracking-[0.15em] px-8 py-4 rounded-sm hover:bg-crimson-light transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-crimson/5 hover:translate-x-1"
                                        >
                                            Book tour <ArrowRight size={14} />
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
                                        <div className="text-2xl font-black text-ink tracking-tight">{tour.day} {tour.month}</div>
                                        <div className="text-[10px] text-ink/60 font-black uppercase tracking-widest mt-1">
                                            {tour.year} · {tour.time}
                                        </div>
                                    </div>
                                    <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm ${tour.isLimited ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-ink'}`}>
                                        {tour.availability}
                                    </div>
                                </div>

                                {/* Body: Facility & Campus */}
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-crimson block mb-1">Infrastructure Campus</span>
                                        <div className="text-[18px] font-black text-ink leading-tight">{tour.facility}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                        <div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-ink/40 block mb-1">Location</span>
                                            <div className="text-[11px] font-black uppercase tracking-wider text-ink">{tour.location}</div>
                                        </div>
                                        <div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-ink/40 block mb-1">Focus Group</span>
                                            <div className="text-[11px] font-black uppercase tracking-wider text-ink">{tour.focus}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleBookTour(tour)}
                                    className="w-full bg-crimson text-white text-[11px] font-black uppercase tracking-[0.2em] py-5 rounded-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                                >
                                    Book tour <ArrowRight size={16} />
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
