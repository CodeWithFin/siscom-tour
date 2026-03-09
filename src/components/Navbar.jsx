import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4 ${scrolled
                ? 'bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link to="/" className="flex items-center">
                        <Logo className="h-6 md:h-8" color="#C41230" />
                    </Link>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            to={isHome ? "#tours" : "/#tours"}
                            onClick={scrollToTours}
                            className="group flex items-center gap-2 bg-crimson text-white text-[10px] font-black tracking-[0.1em] uppercase px-6 py-3 hover:bg-crimson-light transition-all hover:-translate-y-0.5 shadow-lg shadow-crimson/10"
                        >
                            Book tour
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link
                                to={isHome ? "#tours" : "/#tours"}
                                onClick={scrollToTours}
                                className="block bg-crimson text-white text-center text-sm font-black uppercase tracking-widest px-5 py-5 hover:bg-crimson-light transition-all"
                            >
                                Book tour
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
