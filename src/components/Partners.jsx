"use client";
import { motion } from 'framer-motion';

const facilityPartners = [
    'IX Africa', 'iColo', 'Africa Data Centers', 'Safaricom', 'Liquid Intelligent', 'Airtel Business', 'Seacom', 'MainOne'
];

export default function Partners() {
    const doubled = [...facilityPartners, ...facilityPartners];

    return (
        <section className="py-24 bg-white border-y border-gray-100 overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex items-center gap-6">
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="h-[1px] flex-1 bg-gray-100 origin-left"
                    />
                    <motion.h2
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
                        transition={{ duration: 1 }}
                        className="text-[10px] font-black uppercase text-mid whitespace-nowrap"
                    >
                        Infrastructure Partners & Carrier Ecosystem
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="h-[1px] flex-1 bg-gray-100 origin-right"
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex relative items-center h-20"
            >
                <div className="flex animate-marquee-scroll-reverse whitespace-nowrap py-4">
                    {doubled.map((partner, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, color: "#DE3163" }}
                            transition={{ duration: 0.3 }}
                            className="mx-16 text-2xl md:text-5xl font-black tracking-tighter text-gray-200 cursor-default uppercase transition-colors"
                        >
                            {partner}
                        </motion.div>
                    ))}
                </div>
                {/* Gradients for fading edges */}
                <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
            </motion.div>
        </section>
    );
}
