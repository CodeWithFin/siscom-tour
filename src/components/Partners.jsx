import { motion } from 'framer-motion';

const facilityPartners = [
    'IX Africa', 'iColo', 'Africa Data Centers', 'Safaricom', 'Liquid Intelligent', 'Airtel Business', 'Seacom', 'MainOne'
];

export default function Partners() {
    const doubled = [...facilityPartners, ...facilityPartners];

    return (
        <section className="py-20 bg-white border-y border-gray-100 overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gray-100" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-mid whitespace-nowrap">
                        Infrastructure Partners & Carrier Ecosystem
                    </h2>
                    <div className="h-[1px] flex-1 bg-gray-100" />
                </div>
            </div>

            <div className="flex relative items-center h-16">
                <div className="flex animate-marquee-scroll whitespace-nowrap">
                    {doubled.map((partner, i) => (
                        <div
                            key={i}
                            className="mx-16 text-2xl md:text-4xl font-black tracking-tighter text-gray-200 hover:text-crimson transition-colors duration-500 cursor-default uppercase"
                        >
                            {partner}
                        </div>
                    ))}
                </div>
                {/* Gradients for fading edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            </div>
        </section>
    );
}
