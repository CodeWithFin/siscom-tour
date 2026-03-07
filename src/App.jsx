import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Partners from './components/Partners';
import TourCards from './components/TourCards';
import WhyTour from './components/WhyTour';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

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
      <BookingForm />
      <Footer />
    </main>
  );
}
