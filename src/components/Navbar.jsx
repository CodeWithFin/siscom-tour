"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isCheckout = pathname === '/checkout';

    useEffect(() => {
        setPrevScrollPos(window.scrollY);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            // Background blur logic
            setScrolled(currentScrollPos > 20);

            // Visibility logic (Hide on scroll down, show on scroll up)
            if (currentScrollPos > 100) { // Only start hiding after some scrolling
                setVisible(prevScrollPos > currentScrollPos);
            } else {
                setVisible(true);
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const scrollToTours = (e) => {
        if (isHome) {
            e.preventDefault();
            const element = document.getElementById('tours');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
            }
        }
    };

    return (
        <nav
            className={`absolute top-0 left-0 right-0 z-[100] transition-all duration-500 py-1 border-b border-gray-200 shadow-sm shadow-gray-200/50 ${scrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-md shadow-gray-200/80'
                : 'bg-white/90 backdrop-blur-md'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link href="/" className="flex items-center">
                        <Logo className="h-8 md:h-12" />
                    </Link>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {!isCheckout && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link
                                href={isHome ? "#tours" : "/#tours"}
                                onClick={scrollToTours}
                                className="group relative overflow-hidden flex items-center gap-2 bg-crimson text-white text-[10px] font-black tracking-[0.1em] uppercase px-8 py-4 hover:bg-crimson-light transition-all hover:-translate-y-0.5 shadow-xl shadow-crimson/10"
                            >
                                <div className="absolute inset-0 bg-brand-stripes opacity-30" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Book tour
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </motion.div>
                    )}
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
                        {!isCheckout && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link
                                    href={isHome ? "#tours" : "/#tours"}
                                    onClick={scrollToTours}
                                    className="block relative overflow-hidden bg-crimson text-white text-center text-xs font-black uppercase tracking-widest px-5 py-3 hover:bg-crimson-light transition-all"
                                >
                                    <div className="absolute inset-0 bg-brand-stripes opacity-30" />
                                    <span className="relative z-10">Book tour</span>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
