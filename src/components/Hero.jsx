import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const stats = [
        { label: 'Uptime SLA', value: '99.98%', icon: <Zap size={18} className="text-crimson" /> },
        { label: 'Carrier Neutral', value: '15+ ISPs', icon: <Globe size={18} className="text-crimson" /> },
        { label: 'Security Tier', value: 'Tier III+', icon: <ShieldCheck size={18} className="text-crimson" /> },
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white"
        >
            {/* Background Grid & Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-30" />
                <motion.div
                    style={{ y, opacity }}
                    className="absolute -right-20 top-40 w-[60%] h-[70%] hidden lg:block"
                >
                    <img
                        src="/hero-dc.png"
                        alt="Data Center Ecosystem"
                        className="w-full h-full object-cover rounded-tl-[100px] border border-gray-100 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full mb-8 shadow-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink">
                            Exclusive Data Centre Access · Nairobi
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-ink mb-8 leading-[0.9] tracking-tighter">
                            Walk the Floor.<br />
                            <span className="text-crimson italic">See the Future.</span>
                        </h1>
                    </motion.div>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-2xl text-mid mb-12 max-w-xl font-medium leading-relaxed"
                    >
                        Observe the racks, connect with engineers, and understand why global institutions
                        are placing capital here — before the next wave hits.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <a
                            href="#book"
                            className="w-full sm:w-auto bg-ink text-white px-10 py-5 font-black uppercase tracking-widest text-[10px] hover:bg-crimson transition-all hover:-translate-y-1 shadow-xl hover:shadow-crimson/20 flex items-center justify-center gap-2"
                        >
                            Book Your Spot <ArrowUpRight size={16} />
                        </a>
                        <a
                            href="#why"
                            className="w-full sm:w-auto bg-white text-ink border border-gray-100 px-10 py-5 font-black uppercase tracking-widest text-[10px] hover:border-crimson transition-all"
                        >
                            View Why Tour
                        </a>
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-transparent group-hover:border-crimson/50 rounded-sm transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-xl font-black text-ink tracking-tight">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Connectivity Visualization (Bottom Right) */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-20 pointer-events-none"
            >
                <img src="/connectivity.png" alt="" className="w-full h-full object-contain mix-blend-multiply grayscale" />
            </motion.div>
        </section>
    );
}
