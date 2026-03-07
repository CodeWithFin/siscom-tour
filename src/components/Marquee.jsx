import { motion } from 'framer-motion';

export default function Marquee() {
    const items = [
        { text: 'IX Africa Campus · Available', accent: false },
        { text: 'iColo NBO2 · Booking Open', accent: false },
        { text: '5,000+ Available Racks · Kenya', accent: false },
        { text: 'Micro-Colocation from $100 / 1U', accent: true },
        { text: 'Tokenized DC Investment · CMA Sandbox', accent: false },
        { text: '99.97% Uptime SLA', accent: false },
        { text: 'Book Your Tour Today', accent: true },
    ];

    const doubled = [...items, ...items, ...items];

    return (
        <div className="relative py-6 overflow-hidden select-none bg-white border-y border-gray-100">
            <div className="marquee-track flex whitespace-nowrap">
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className={`inline-flex items-center gap-4 mx-12 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] ${item.accent ? 'text-crimson' : 'text-mid'
                            }`}
                    >
                        <span className="w-1.5 h-1.5 rounded-sm bg-current opacity-40" />
                        {item.text}
                    </span>
                ))}
            </div>
        </div>
    );
}
