import { motion } from 'framer-motion';

export default function Hero() {
    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] } }
    };

    return (
        <section className="relative min-h-[95vh] flex items-center justify-center pt-16 overflow-hidden bg-white">
            {/* Grid pattern background */}
            <div className="absolute inset-0 hero-grid-pattern opacity-60" />

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/90" />

            {/* Decorative elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-20 right-[10%] w-72 h-72 rounded-full border border-crimson/10"
            />
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.05, x: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-crimson"
            />

            <motion.div
                variants={containerVars}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20"
            >
                {/* Badge */}
                <motion.div
                    variants={itemVars}
                    className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-mid">
                        Exclusive Data Centre Access · Nairobi
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={itemVars}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-tighter text-ink mb-8"
                >
                    Walk the Floor.<br />
                    <span className="text-crimson">See the Future.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    variants={itemVars}
                    className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-mid leading-relaxed mb-12 font-medium"
                >
                    Step inside Africa&apos;s fastest-growing data centre ecosystem. Observe the racks,
                    connect with engineers, and understand why institutions are placing capital here —
                    before the next wave.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={itemVars}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#book"
                        className="group relative bg-crimson text-white font-bold text-sm uppercase tracking-widest px-10 py-5 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(196,18,48,0.3)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Reserve Your Spot <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                    <a
                        href="#tours"
                        className="border-2 border-ink text-ink font-bold text-sm uppercase tracking-widest px-10 py-5 hover:bg-ink hover:text-white transition-all duration-300"
                    >
                        View Tour Dates
                    </a>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    variants={itemVars}
                    className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-gray-100 pt-12"
                >
                    {[
                        { num: '5,000+', label: 'Available Racks' },
                        { num: '99.97%', label: 'Uptime SLA' },
                        { num: '3', label: 'Facilities' },
                        { num: '$100', label: 'From / 1U' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center group">
                            <div className="text-2xl md:text-4xl font-extrabold text-ink transition-transform group-hover:scale-110 duration-300">{stat.num}</div>
                            <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted mt-2 border-t border-gray-50 pt-2 inline-block">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
