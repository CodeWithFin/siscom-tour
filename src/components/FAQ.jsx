"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Is the tour safe and regulated?",
        answer: "Absolutely. All Siscom partner facilities are Tier III+ certified and undergo rigorous physical security audits. Tours are guided by certified facility engineers and follow strict health and safety protocols."
    },
    {
        question: "What is the minimum investment for DC assets?",
        answer: "Our tokenized data center asset models start as low as $1,000 for verified investors, allowing participation in high-yield infrastructure growth with lower entry barriers."
    },
    {
        question: "Can SMEs book colocation space directly?",
        answer: "Yes. We offer micro-colocation options starting from $100/1U, specifically designed for SMEs and startups requiring high-reliability infrastructure without hyperscale commitments."
    },
    {
        question: "Are there NDAs involved?",
        answer: "Due to the sensitive nature of the infrastructure and client data privacy, all visitors are required to sign a standard Non-Disclosure Agreement (NDA) and present valid identification upon arrival."
    },
    {
        question: "What should I bring to the tour?",
        answer: "Just your ID and comfortable footwear. We provide any necessary safety gear. Photography is strictly prohibited inside the white space for security reasons."
    }
];

function FAQItem({ question, answer, index }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 flex items-center justify-between text-left group"
            >
                <span className="text-lg md:text-xl font-bold text-ink group-hover:text-crimson transition-colors">
                    {question}
                </span>
                <div className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${isOpen ? 'bg-crimson border-crimson text-white' : 'bg-white text-mid'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-mid text-base md:text-lg leading-relaxed max-w-2xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    return (
        <section id="faq" className="py-24 bg-white relative">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-crimson mb-4 block"
                    >
                        Assistance
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-ink mt-3 tracking-tighter"
                    >
                        Common <span className="text-crimson">Queries.</span>
                    </motion.h2>
                </div>

                <div className="divide-y divide-gray-100">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} index={i} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
}
