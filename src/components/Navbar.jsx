import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Tour Dates', href: '#tours' },
        { label: 'Why Tour', href: '#why' },
        { label: 'Book', href: '#book' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4 ${scrolled
                ? 'bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
                {/* Logo */}
                <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    href="#"
                    className="flex items-center"
                >
                    <Logo className="h-6 md:h-8" color="#C41230" />
                </motion.a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                href={link.href}
                                className="text-[10px] font-bold uppercase tracking-[0.25em] text-mid hover:text-crimson transition-all relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crimson transition-all duration-300 group-hover:w-full" />
                            </motion.a>
                        ))}
                    </div>

                    <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        href="#book"
                        className="group flex items-center gap-2 bg-ink text-white text-[10px] font-black tracking-[0.1em] uppercase px-6 py-3 hover:bg-crimson transition-all hover:-translate-y-0.5"
                    >
                        Book a Tour
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                {/* Mobile Menu Toggle */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2 text-ink"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 glass px-6 py-8 space-y-6 shadow-2xl overflow-hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block text-2xl font-black uppercase tracking-tighter text-ink hover:text-crimson"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            href="#book"
                            onClick={() => setMenuOpen(false)}
                            className="block bg-ink text-white text-center text-sm font-black uppercase tracking-widest px-5 py-5 hover:bg-crimson transition-all"
                        >
                            Book Your Tour Today
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
