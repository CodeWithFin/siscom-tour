"use client";
import { motion } from 'framer-motion';

export default function Marquee() {
    const items = [
        { text: 'IX Africa Campus', accent: false },
        { text: 'iColo NBO2', accent: false },
        { text: '5,000+ Racks', accent: false },
        { text: 'Micro-Colo $100/1U', accent: true },
        { text: 'CMA Sandbox Tokenization', accent: false },
        { text: '99.98% Uptime SLA', accent: false },
        { text: 'Tier III+ Certified', accent: true },
    ];

    const doubled = [...items, ...items, ...items, ...items];

    return (
        <div className="relative py-4 overflow-hidden select-none bg-white text-ink border-y border-gray-100">
            <div className="flex animate-marquee-scroll whitespace-nowrap">
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className={`inline-flex items-center gap-6 mx-16 text-[9px] font-black uppercase tracking-[0.4em] ${item.accent ? 'text-crimson' : 'text-mid'
                            }`}
                    >
                        <div className="w-1 h-1 bg-current opacity-30" />
                        {item.text}
                    </span>
                ))}
            </div>
        </div>
    );
}
