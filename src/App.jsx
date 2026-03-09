import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Partners from './components/Partners';
import TourCards from './components/TourCards';
import WhyTour from './components/WhyTour';
import FAQ from './components/FAQ';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

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

export default function App() {
  return (
    <main className="relative bg-white selection:bg-crimson selection:text-white overflow-hidden">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Marquee />
      <Partners />
      <TourCards />
      <WhyTour />
      <FAQ />
      <BookingForm />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
