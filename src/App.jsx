import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import Navbar from './components/Navbar';
import TourCards from './components/TourCards';
import Checkout from './components/Checkout';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-[100] w-12 h-12 bg-white border border-gray-100 shadow-xl flex items-center justify-center text-ink hover:text-crimson hover:scale-110 transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <ChevronUp size={20} />
    </button>
  );
}

function MainLayout() {
  return (
    <main className="relative bg-white selection:bg-crimson selection:text-white overflow-hidden">
      <div className="noise-overlay" />
      <div className="pt-20"> {/* Add padding for the fixed navbar */}
        <TourCards />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}
