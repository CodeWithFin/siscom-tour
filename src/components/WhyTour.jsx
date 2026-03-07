import { motion } from 'framer-motion';
import { ShieldAlert, Globe2, TrendingUp, Zap, Expand, Users2 } from 'lucide-react';

const features = [
    {
        icon: <ShieldAlert size={32} className="text-crimson" />,
        title: 'Physical Security',
        description: 'Biometric access, mantrap entries, 24/7 CCTV with 90-day retention. See Tier III+ security protocols firsthand.',
    },
    {
        icon: <Globe2 size={32} className="text-crimson" />,
        title: 'Connectivity Hub',
        description: 'Carrier-neutral with 15+ ISPs on-net. Tour the meet-me rooms and see the fibre entry points powering East Africa.',
    },
    {
        icon: <TrendingUp size={32} className="text-crimson" />,
        title: 'Investment Grade',
        description: 'Understand tokenized DC assets, CMA sandbox compliance, and why global institutions are allocating to African DC white space.',
    },
    {
        icon: <Zap size={32} className="text-crimson" />,
        title: 'Power & Cooling',
        description: 'N+1 redundancy, dual utility feeds, 48-hour diesel autonomy. Walk the generator yard and UPS rooms yourself.',
    },
    {
        icon: <Expand size={32} className="text-crimson" />,
        title: 'Scalable Infrastructure',
        description: 'See available white space, expansion plans, and how facilities scale from 1U micro-colo to full-hall deployments.',
    },
    {
        icon: <Users2 size={32} className="text-crimson" />,
        title: 'Meet the Team',
        description: 'Direct access to facility managers, sales engineers, and investment liaisons. Get answers in person, not via email.',
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
        <section id="why" className="relative py-32 bg-gray-50/50 overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-crimson/5 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-crimson mb-4 block"
                    >
                        The Experience
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-ink mt-3 tracking-tighter"
                    >
                        What You&apos;ll Witness
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-2xl mx-auto text-mid mt-8 text-lg md:text-xl font-medium"
                    >
                        A data centre tour isn&apos;t just a sales pitch. It&apos;s a deep dive into the
                        mission-critical infrastructure powering Africa&apos;s digital future.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={itemVars}
                            className="bg-white border-2 border-transparent hover:border-crimson/20 p-10 rounded-sm hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-500 group"
                        >
                            <div className="mb-8 w-16 h-16 bg-gray-50 flex items-center justify-center rounded-sm transition-transform group-hover:scale-110 group-hover:bg-crimson group-hover:text-white duration-300">
                                <div className="group-hover:text-white transition-colors">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-ink mb-4 tracking-tight group-hover:text-crimson transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-mid md:text-base leading-relaxed font-medium">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
