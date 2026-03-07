import { motion } from 'framer-motion';
import { ShieldAlert, Globe2, TrendingUp, Zap, Expand, Users2 } from 'lucide-react';

const features = [
    {
        icon: <ShieldAlert size={24} />,
        title: 'Physical Security',
        description: 'Biometric access, mantrap entries, 24/7 CCTV with 90-day retention.',
    },
    {
        icon: <Globe2 size={24} />,
        title: 'Connectivity Hub',
        description: 'Carrier-neutral with 15+ ISPs on-net. Tour the meet-me rooms.',
    },
    {
        icon: <TrendingUp size={24} />,
        title: 'Investment Grade',
        description: 'Understand tokenized DC assets and CMA sandbox compliance.',
    },
    {
        icon: <Zap size={24} />,
        title: 'Power & Cooling',
        description: 'N+1 redundancy, dual utility feeds, 48-hour diesel autonomy.',
    },
    {
        icon: <Expand size={24} />,
        title: 'Scalable Infrastructure',
        description: 'See available white space and expansion plans.',
    },
    {
        icon: <Users2 size={24} />,
        title: 'Meet the Team',
        description: 'Direct access to facility managers and investment liaisons.',
    },
];

export default function WhyTour() {
    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="why" className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Main Visual Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[600px]"
                    >
                        <div className="absolute inset-0 bg-crimson/5 rounded-sm -rotate-2 scale-105" />
                        <img
                            src="/facility.png"
                            alt="Siscom Data Center Facility"
                            className="absolute inset-0 w-full h-full object-cover rounded-sm shadow-2xl border-4 border-white"
                        />
                        {/* Absolute Overlay Badge */}
                        <div className="absolute -bottom-10 -right-10 bg-ink text-white p-8 rounded-sm shadow-2xl max-w-xs hidden sm:block">
                            <div className="text-3xl font-black mb-2 tracking-tighter">Tier III+ Certified</div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose">
                                Facility standards compliant with international security protocols and environmental controls.
                            </p>
                        </div>
                    </motion.div>

                    {/* Features Content */}
                    <div>
                        <div className="mb-12">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson mb-4 block"
                            >
                                The Infrastructure
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-black text-ink mt-3 tracking-tighter leading-tight"
                            >
                                Engineered for <br />
                                <span className="text-crimson italic">Absolute Performance.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="max-w-xl text-mid mt-8 text-lg font-medium leading-relaxed"
                            >
                                A data centre tour isn&apos;t just a sales pitch. It&apos;s a deep dive into the
                                mission-critical infrastructure powering Africa&apos;s digital future.
                            </motion.p>
                        </div>

                        {/* Features Mini-Grid */}
                        <motion.div
                            variants={containerVars}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid sm:grid-cols-2 gap-8"
                        >
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVars}
                                    className="group"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 flex items-center justify-center bg-gray-50 text-crimson group-hover:bg-crimson group-hover:text-white transition-all duration-300 rounded-sm">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-sm font-black text-ink tracking-tight">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="text-[11px] font-bold text-mid uppercase tracking-[0.05em] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
